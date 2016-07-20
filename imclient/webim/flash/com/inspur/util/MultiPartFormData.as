package com.inspur.util
{
	import flash.utils.ByteArray;
	
	public class MultiPartFormData extends Object
	{
		public const BOUNDARY:String= "---------------------------7d4485a6d1158"; 
         
		private var fieldName:String="Content-Disposition: form-data; name=\"XXXX\""; 
		 
		private var fieldValue:String= "XXXX"; 
		 
		private var fileField:String="Content-Disposition: form-data; name=\"XXXX\"; filename=\"XXXXXXXX\""; 
		 
		private var fileContentType:String= "Content-Type: XXXX"; 
		 
		private var formData:ByteArray


		public function MultiPartFormData()
		{
			super();
			formData=new ByteArray(); 
		}
		/** 
         * 添加一个字段数据到From的数据包中 
         * 
         */ 
        public function addFormField( FieldName:String,  FieldValue:String):void 
        { 
            var newFieldName:String=fieldName; 
            var newFieldValue:String=fieldValue; 
            
            newFieldName=newFieldName.replace("XXXX",FieldName); 
            newFieldValue=newFieldValue.replace("XXXX",FieldValue); 
            
            formData.writeMultiByte( "--"+BOUNDARY+"\r\n","UTF-8"); 
            formData.writeMultiByte( newFieldName+"\r\n\r\n","UTF-8"); 
            formData.writeMultiByte( newFieldValue+"\r\n","UTF-8"); 
        } 
        
        
        /** 
         * 添加一个文件二进流数据到Form的数据包中，并指定二进流数据的类型 
         * @author qwliang 
         */ 
        public function addFile( FieldName:String, FileName:String,FileContent:ByteArray, ContentType:String):void 
        { 
            var newFileField:String=fileField; 
            var newFileContentType:String=fileContentType; 
            
            newFileField=newFileField.replace("XXXX",FieldName); 
            newFileField=newFileField.replace("XXXXXXXX",FileName); 
            
            newFileContentType=newFileContentType.replace("XXXX",ContentType); 
            
            formData.writeMultiByte( "--"+BOUNDARY+"\r\n","UTF-8"); 
            formData.writeMultiByte( newFileField+"\r\n","UTF-8"); 
            formData.writeMultiByte( newFileContentType+"\r\n\r\n","UTF-8"); 
            
            formData.writeBytes(FileContent,0,FileContent.length); 
            
            formData.writeMultiByte("\r\n","UTF-8"); 
        } 
        
        /** 
         * 添加一个文件二进流数据到Form的数据包中 
         * @author qwliang 
         */ 
        public function addStreamFile( FieldName:String, FileName:String,FileContent:ByteArray):void 
        { 
            addFile( FieldName, FileName, FileContent,"application/octet-stream"); 
        } 
         
         /** 
          * 获得From的完整数据 
          * @author qwliang 
          */ 
         public function getFormData():ByteArray 
         {
         	formData.writeMultiByte( "--"+BOUNDARY+"--","UTF-8");
            return formData; 
         }
	}
}