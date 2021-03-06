import Promise from 'bluebird';
import ErrorConstants from '../constants/ErrorConstants';

export default function(promise, dispatch, successHandler, errorHandler){
  if(!successHandler){
    throw new Error('No Success Handler Provided!');
  }

  Promise.resolve(promise)
  .then(function(response){
    if(response.success){
      successHandler(response);
    }
    else {
      var error = response.msg || response.err;
      throw new Error(error);
    }
  })
  .catch(function(err){
    if(errorHandler){
      errorHandler(err);
    }
    else {
      console.warn(err);
      dispatch({
        type: ErrorConstants.APPLICATION_ERROR,
        msg: err
      });
    }
  })
}
