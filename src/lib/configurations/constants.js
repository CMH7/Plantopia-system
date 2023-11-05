export default {
  /**
   * 
   * @param {string} to 
   * @param {string} name
   * 
   */
	newMsg: (to, name) => {
		return {
			to,
			from: "plantopiacaps123@gmail.com",
			template_id: "d-6b08dfecffdd4652bdfb460ef26b02ac",
			dynamic_template_data: {
        name,
        email: to
			},
		};
  },
  /**
   * 
   * @param {string} to 
   * @param {string} name 
   * 
   */
  successVerificationMsg: (to, name)  =>{
    return {
			to,
			from: "plantopiacaps123@gmail.com",
      template_id: "d-63fee8f7178e413093aaa7b0bfeb72e7",
      dynamic_template_data: {
        name
      },
		};
  }
};