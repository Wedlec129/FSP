import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default class{

    static async getAll(url, time =1000) {


        return await axios.post('http://localhost:3005/api/posts',{
            url: url,
            time: time
        })

        // return await axios.get('http://localhost:3005/api/posts')

    }


}