using System;

namespace ArticleAssignment.Core
{
    public interface IErrorText
    {
        public string GetExceptionResponse<M>(ActionType actionType);

        public string GetExceptionResponse<M, RM>(ActionType actionType);

        public MessageResponse GetMessageResponse<M>(ActionType actionType, Exception exception);

        public MessageResponse GetMessageResponse<M, I>(ActionType actionType, I input, Exception exception);

        public MessageResponse GetMessageResponse<M>(ActionType actionType, long id, bool success);


    }
}
