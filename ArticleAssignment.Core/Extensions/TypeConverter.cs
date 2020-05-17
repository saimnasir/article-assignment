using ArticleAssignment.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArticleAssignment.Core.Extensions
{
    public static class TypeConverter
    {
        public static long ToLong(this States key)
        {
            long val = (long)key;
            return val;
        }
    }
}
