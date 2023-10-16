class Apifeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
// search function 
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        }:{};
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }
// filter function 
    filter(){
        const copyquery = {...this.queryStr}
        // removing filters for the query 

        const remvefilter = ["keyword","limit","page","sort","fields"]
        remvefilter.forEach(qr => delete copyquery[qr]);
        // advance filter option 
        let queryString = JSON.stringify(copyquery);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryString);

        this.query = this.query.find(queryObj);

        return this;
    }
    // sorting function 
    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields(){
        console.log(this.queryStr.fields)
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate(){
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;
        const skip = (page -1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = Apifeatures;