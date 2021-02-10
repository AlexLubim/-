'use strict'


class Director {
    constructor(projects){
        this.projects = projects;
    }
    set addNewProjects(value){
        if(Object.keys(this.projects).length == 0){
            for(let i = 1; i < value+1; i++){
                this.projects[`project${i}`] = {hard:`${Math.floor(Math.random()*Math.floor(3))}`};
                if(Math.floor(Math.random()*Math.floor(2)) == 0){
                    this.projects[`project${i}`].type = 'web';
                    this.projects[`project${i}`].inWork = false;
                }else{
                    this.projects[`project${i}`].type = 'mobile';
                    this.projects[`project${i}`].inWork = false;
                }
            }
        }else{
            for(let i = 1; i < value+1; i++){
                this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8)) + 1}`] = {hard:`${Math.floor(Math.random()*Math.floor(3))}`};
                if(Math.floor(Math.random()*Math.floor(2)) == 0){
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].type = 'web';
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].inWork = false;
                }else{
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].type = 'mobile';
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].inWork = false;
                }
            }
        }
    }

    get pushProjects(){
        if(this.projects != {}){
            return this.projects;
        }
        
    }

    recruit(){
        if(Object.keys(this.projects).length != 0){
            for(let g in this.projects){
                if(this.projects[g].inWork == false){
                    if (this.projects[g].type == 'web'){
                        this.projects[g].worker = new Worker('web',false);
                        webDepartment.workers[parseInt(Object.keys(webDepartment.workers)[Object.keys(webDepartment.workers).length])] = this.projects[g].worker;
                    }else{
                        this.projects[g].worker = new Worker('mobile',false);
                        mobileDepartment.workers[parseInt(Object.keys(webDepartment.workers)[Object.keys(webDepartment.workers).length])] = this.projects[g].worker;
                    }
                    
                    // if(Object.keys(webDepartment.workers).length == 0){
                        
                    // }else{
                    //     webDepartment.workers[parseInt(Object.keys(webDepartment.workers)[Object.keys(webDepartment.workers).length])] = workerWeb;
                    // }

                    // this.projects[g].worker = worker1;
                    // webDepartment.projects.project1.worker.working = true;  
                }
            }
        }
    }

}

class Departments{
    workers = {}

    constructor(option){
        this.type = option.type;
        this.projects = option.projects;
    }
    

    set addProjectFromDirector(value){
        for(let prop in value){
            if (value[prop].type == this.type){
                if(Object.keys(this.workers) != 0 ){
                    for(let i in this.workers){
                        if (this.workers[i].working == false){
                            this.projects[prop] = value[prop];
                            this.projects[prop].inWork = true;
                            this.workers[i].working == true;
                            this.workers[i].doproj == this.projects[prop];
                        }
                    }
                }
            }
        }
        console.log(this);   
    }
    // set workers(value){
        
    // }
    
}

class Worker{
    constructor(type,working){
        this.type = type;
        this.working = working;
    }
}


const director = new Director({});
const webDepartment = new Departments({
                                    type: 'web',
                                    projects:{}
                                    });
const mobileDepartment = new Departments({
                                        type: 'mobile',
                                        projects:{}
                                        });

const testDepartment = new Departments('test');


// director.addNewProjects = Math.floor(Math.random() * Math.floor(5));
// console.log(director.pushProjects)

// webDepartment.addProjectFromDirector = director.pushProjects
// mobileDepartment.addProjectFromDirector = director.pushProjects

// director.recruit();



// console.log(webDepartment.projects)
// console.log(webDepartment)



// console.log(director.pushProjects)

// console.log(director.pushProjects)


function company(day){
    for(let i = 0;i < day;i++){
        console.log(`Day    ${i+1}\n`);

        director.addNewProjects = Math.floor(Math.random() * Math.floor(5));
        console.log(director.pushProjects);
        console.log('\n');


        
        console.log('Web');
        webDepartment.addProjectFromDirector = director.pushProjects
        console.log('\n');
        console.log('Mobile')
        mobileDepartment.addProjectFromDirector = director.pushProjects
        director.recruit();
        console.log('____________________________________________________________________')
    }
}
company(2);
