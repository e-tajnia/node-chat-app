class Users {
    constructor(){
        this.Users=[];
    }

    addUsers(id,name,room){
        var user = {id,name,room};
        this.Users.push(user);
        return user;
    }

    removeUser(id){
        var user = this.getUser(id)
        if (user) {
            this.Users.filter((user)=> user.id !== id )
        } 
        return user;
    }

    getUser(id){
        return this.Users.filter((user)=> user.id == id)[0]
    }

    getUserList(room){
        var users = this.Users.filter((user)=> user.room === room)
        var namesArray = users.map((user)=>user.name)
        return namesArray;
    }
}

module.exports={Users}