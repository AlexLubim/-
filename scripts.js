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
                    this.projects[`project${i}`].statusDone = 0;
                    this.projects[`project${i}`].done = false;
                    this.projects[`project${i}`].statusTest = 0;
                }else{
                    this.projects[`project${i}`].type = 'mobile';
                    this.projects[`project${i}`].inWork = false;
                    this.projects[`project${i}`].statusDone = 0;
                    this.projects[`project${i}`].done = false;
                    this.projects[`project${i}`].statusTest = 0;
                }
            }
        }else{
            for(let i = 1; i < value+1; i++){
                this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8)) + 1}`] = {hard:`${Math.floor(Math.random()*Math.floor(3))}`};
                if(Math.floor(Math.random()*Math.floor(2)) == 0){
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].type = 'web';
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].inWork = false;
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].statusDone = 0;
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].done = false;
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].statusTest = 0;
                }else{
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].type = 'mobile';
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].inWork = false;
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].statusDone = 0;
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].done = false;
                    this.projects[`project${parseInt(Object.keys(this.projects)[Object.keys(this.projects).length - 1].slice(7,8))}`].statusTest = 0;
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
                if(this.projects[g].inWork == false && this.projects[g].done != true){
                    if (this.projects[g].type == 'web'){
                        this.projects[g].worker = new Worker('web',false, g, 0);
                        webDepartment.workers[`worker${parseInt(Object.keys(webDepartment.workers).length + 1)}`] = this.projects[g].worker;
                    }else{
                        this.projects[g].worker = new Worker('mobile',false, g, 0);
                        mobileDepartment.workers[`worker${parseInt(Object.keys(mobileDepartment.workers).length + 1)}`] = this.projects[g].worker;
                    } 
                }      
            }
        }
    }
    set recruitTester(proj){
        for(let i in this.projects){   
            if(this.projects[i] == proj){
                this.projects[i].worker = new Worker('test',false,i,0);
                testDepartment.workers[`worker${parseInt(Object.keys(testDepartment.workers).length + 1)}`] = proj.worker;
            }    
        }
    }
}

class Departments extends Director{
    workers = {}

    constructor(option){
        super(Director)
        this.type = option.type;
        this.projects = option.projects;
    }
    

    set addProjectFromDirector(value){
        for(let prop in value){
            if (value[prop].type == this.type && value[prop].worker != undefined && value[prop].inWork == false){
                if(Object.keys(this.workers) != 0 ){
                    webDepartment.recruit();
                    for(let i in this.workers){
                        if (this.workers[i].working == false){
                            this.projects[prop] = value[prop];
                            value[prop].inWork = true;
                            value[prop].worker.working = true;
                            
                        }
                    }
                }
            }
        }
        console.log(this);   
    }

    set work(listProj){
        for(let listItem in listProj){
            for(let i in this.projects){
                if(listItem == i && this.projects[i].done == false){
                    if( listProj[listItem].hard == 0 && listProj[listItem].statusDone == 1){
                        listProj[listItem].done = true;
                        listProj[listItem].worker.donesProj +=1;
                        listProj[listItem].worker.doproj = null;
                        listProj[listItem].worker.working = false;
                        delete listProj[listItem].worker;
                    }
                    if( listProj[listItem].hard == 1 && listProj[listItem].statusDone == 2){
                        listProj[listItem].done = true;
                        listProj[listItem].worker.donesProj +=1;
                        listProj[listItem].worker.doproj = null;
                        listProj[listItem].worker.working = false;
                        delete listProj[listItem].worker;
                    }
                    if( listProj[listItem].hard == 2 && listProj[listItem].statusDone == 3){
                        listProj[listItem].done = true;
                        listProj[listItem].worker.donesProj +=1;
                        listProj[listItem].worker.doproj = null;
                        listProj[listItem].worker.working = false;
                        delete listProj[listItem].worker;
                    }
                    listProj[listItem].statusDone += 1;
                }
                if (this.projects[i].done == true){
                    testDepartment.onTest = i;
                }
            }
        }
    }
    set onTest(done){
        this.projects[done] = director.pushProjects[done];
    }

    set testing(list){
        if(Object.keys(this.projects).length != 0){
            for(let i in this.projects){
                console.log('00000',i,this);
                if(this.projects[i].statusTest == 0 && this.projects[i].worker == undefined){
                    this.recruitTester = this.projects[i];
                    this.projects[i].statusTest += 1;
                }else{
                    if(this.projects[i].statusTest != 0 && this.projects[i].worker != undefined){
                        this.projects[i].statusTest += 1;
                    }
                }
            }
            for(let i in this.projects){
                if(this.projects[i].statusTest == 1 ){

                    this.projects[i].worker.donesProj += 1;
                    this.projects[i].worker.doproj = null;
                    this.projects[i].worker.working = false;
                    delete this.projects[i].worker;
                    if(this.projects[i].type == 'web'){
                        delete webDepartment.projects[i];
                    }else{
                        delete mobileDepartment.projects[i];
                    }
                    delete this.projects[i]
                    delete director.projects[i];

                    // director.relise +=1
                
                }
            }   
        } 
    } 
}

class Worker{
    constructor(type,working,doproj,donesProj){
        this.type = type;
        this.working = working;
        this.doproj = doproj;
        this.donesProj = donesProj;
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

const testDepartment = new Departments({
                                        type: 'test',
                                        projects:{}
                                        });

function company(day){
    for(let i = 0;i < day;i++){
        director.recruit();

        director.addNewProjects = Math.floor(Math.random() * Math.floor(2));
        console.log(director.pushProjects);

        console.log('Web');
        webDepartment.addProjectFromDirector = director.pushProjects
        console.log('Mobile')
        mobileDepartment.addProjectFromDirector = director.pushProjects

        webDepartment.work = director.pushProjects;
        mobileDepartment.work = director.pushProjects;
        testDepartment.testing = director.pushProjects

        console.log('Test')
        console.log(testDepartment);
        console.log(director.pushProjects);
        console.log('webDepartament >>', webDepartment);
        console.log('mobileDepartament >>', mobileDepartment);
        console.log('---------------------------------')
        console.log(testDepartment);
        console.log('-------------end----------------')
    }
}
company(10);

