class ApiFeatures{
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }
    search(){
        let keyword=this.queryStr.keyword?{name:{
            $regex:this.queryStr.keyword,
            $options:'i'
        }}:{};
        this.query.find({...keyword})
        return this
    }
    filter(){
        const queryStrCopy={...this.queryStr}
        const removeField=['keyword','limit','page']
    
        removeField.forEach((field)=>delete queryStrCopy[field] )
        let queryStr=JSON.stringify(queryStrCopy)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte)/g,match=>`$${match}`)

        this.query.find(JSON.parse(queryStr))
        return this
    }
    paginate(perPage){
        const currentPage=Number(this.queryStr.page) || 1;
        const skip=perPage * (currentPage - 1)
        this.query.limit(perPage).skip(skip);
        return this;
    }

}
module.exports=ApiFeatures