using System;

namespace ArticleAssignment.Core
{
    public class ErrorText : IErrorText
    {
        public string GetExceptionResponse<M>(ActionType actionType)
        {
            switch (actionType)
            {
                case ActionType.Create:
                case ActionType.Read:
                case ActionType.Update:
                    return $"{getActionName(actionType)} {getModelName<M>()} failed.";
                case ActionType.Delete:
                    return $"{getModelName<M>()} not found.";
                case ActionType.List:
                    return $"No {getModelName<M>()}s were found.";

                default:
                    return $"{getActionName(actionType)} is undefined.";

            }
        }

        public string GetExceptionResponse<M, RM>(ActionType actionType)
        {
            return $"{getModelName<RM>()} not found or deleted.";
        }

        public MessageResponse GetMessageResponse<M>(ActionType actionType, Exception exception)
        {
            return GetMessageResponse<M, object>(actionType, input: null, exception);
        }

        public MessageResponse GetMessageResponse<M, I>(ActionType actionType, I input, Exception exception)
        {
            string inputType = "Input";
            if (typeof(I) != typeof(object))
            {
                inputType = getModelName<M>();
            }
            var messageResponse = new MessageResponse
            {
                Message = exception == null || string.IsNullOrEmpty(exception.Message)
                    ? $"{getActionName(actionType)} {getModelName<M>()} failed."
                    : $"{getActionName(actionType)} {getModelName<M>()} failed. Error: {exception.Message}",
                LogTemplate = input == null
                    ? "{@responseMessage}"
                    : "{@responseMessage}\n\t" + inputType + " => {@input}"
            };
            return messageResponse;
        }


        public MessageResponse GetMessageResponse<M>(ActionType actionType, long id, bool success)
        {
            return new MessageResponse
            {
                Message = $"{getActionName(actionType)} {getModelName<M>()} succeed. [Id:{id}].",
                LogTemplate = "{@responseMessage}"
            };
        }

        private string getModelName<T>()
        {
            return typeof(T).Name;
        }

        private string getActionName(ActionType actionType)
        {
            return Enum.GetName(typeof(ActionType), actionType);
        }
    }
}
