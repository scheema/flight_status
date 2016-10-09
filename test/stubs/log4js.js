var log4jsStub = {
  loadAppender: function(type) {
    return {};
  },
  appenders: {
    file: function() {
      return {};
    }
  },
  addAppender: function(file, logname) {
    return {};
  },
  getLogger: function(logLevel) {
    return {
      info: function(logMessage) {
        return {};
      }
    };
  }
};

exports.stub = log4jsStub;
