
var elasticSearch  = require('elasticsearch');
var elasticClient = new elasticSearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

var searchIndex  = "searchindex";

function deleteIndex()
{
    return elasticClient.indices.delete({
        index  : searchIndex
    });
}


function initIndex()
{
    return elasticClient.indices.create({
        index : searchIndex
    });
}


function indexExist()
{
    return elasticClient.indices.exists({
            index : searchIndex
    });
}


function initMapping()
{
    return elasticClient.indices.putMapping({
        index: searchIndex,
        type : "document",
        body : {
            properties:{
                title: { type: "string" },
                content: { type: "string" },
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple",
                    payloads: true
            }
        }
    }
    });
}

function addDocument(document) {  
    return elasticClient.index({
        index: searchIndex,
        type: "document",
        body: {
            title: document.title,
            content: document.content,
            suggest: {
                input: document.title.split(" "),
                output: document.title,
                payload: document.metadata || {}
            }
        }
    });
}

function getSuggestions(input) {  
    return elasticClient.suggest({
        index: searchIndex,
        type: "document",
        body: {
            docsuggest: {
                text: input,
                completion: {
                    field: "suggest",
                    fuzzy: true
                }
            }
        }
    });
}

exports.getSuggestions = getSuggestions;
exports.deleteIndex   =deleteIndex;
exports.initIndex  = initIndex;
exports.indexExist = indexExist;
exports.initMapping  = initMapping;
exports.addDocument = addDocument;

