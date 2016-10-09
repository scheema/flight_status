var proxyquire = require('proxyquire')
var assert = require('assert');
var log4jsStub = require('./stubs/log4js').stub;
//This is a skeleton
var resStub = {
  json: function(jsonInstance) {
    return jsonInstance;
  }
};
var reqFindByTagStub = {
  'query': {
    'tag': 'test tag 1'
  }
};

var petSearchFindByTag = proxyquire('../services/petSearch', {
  'log4js': log4jsStub
});



describe('Services', function() {
  describe('Find By Tag', function() {
    it('Positive test case for findByTag', function() {

      var result = petSearchFindByTag.findByTag(reqFindByTagStub,
        resStub,
        function(err, res) {
          if (err) {
            throw err;
          }
          console.log('here we are');
          assert.equal(res.Status, 'OK');
          done();
        });

    })
  })
})
