'use strict'
let relise = 0;
let addWorker = 0;
let remWorker = 0;

class Director {
    constructor(projects){
        this.projects = projects;
    }
    set addNewProjects(value){  
      for(let i = 0; i < value; i++){
        
          this.projects[`project${Object.keys(this.projects).length}`] = {hard: Math.round(Math.random()*3),
                                                                          inWork : false,
                                                                          statusDone : 0,
                                                                          done : false,
                                                                          statusTest : 0,
                                                                          type : Math.round(Math.random())
                                                                        };
          // if(Math.round(Math.random()) === 0){
          //     this.projects[`project${Object.keys(this.projects)[Object.keys(this.projects).length]}`].type = 'web';
          // }else{
          //     this.projects[`project${Object.keys(this.projects)[Object.keys(this.projects).length]}`].type = 'mobile';
          // }
      } 
    }

    get pushProjects(){
      return this.projects;   
    }

    recruit(person,project,nameWorker){
      for(let item in director.projects){
        if(this.projects[item].inWork === false && this.projects[item].done != true && this.projects[item].worker === undefined){
          if(!person){
            if(this.projects[item].type === 0){
              this.projects[item].worker = new Worker(0,false, item, 0,0);
              this.projects[item].worker.working = true;
              this.projects[item].inWork = true; 
              webDepartment.workers[`worker${Object.keys(webDepartment.workers).length}`] = this.projects[item].worker;
              addWorker += 1;
            }else{
              this.projects[item].worker = new Worker('1',false, item, 0,0);
              this.projects[item].worker.working = true;
              this.projects[item].inWork = true; 
              mobileDepartment.workers[`worker${Object.keys(mobileDepartment.workers).length}`] = this.projects[item].worker;
              addWorker +=1;
            } 
          }else{ 
            if (this.projects[project].type === 0){
                webDepartment.workers[nameWorker].doProject = project;
                director.projects[project].worker = person
                director.projects[project].worker.working = true;
                director.projects[project].inWork = true;
            }else{
                mobileDepartment.workers[nameWorker].doProject = project;
                director.projects[project].worker = person
                director.projects[project].worker.working = true;
                director.projects[project].inWork = true;
            } 
          }
                  
        }
      }
    }   
    recruitTester(proj, pers,w){
        if(!pers){
            for(let i in this.projects){   
                if(this.projects[i] === proj){
                    this.projects[i].worker = new Worker('test',false,i,0,0);
                    this.projects[i].worker.doProject = i;
                    testDepartment.workers[`worker${parseInt(Object.keys(testDepartment.workers).length)}`] = director.projects[i].worker;
                    addWorker +=1;
                }    
            }
        }else{
            for(let i in this.projects){   
                if(this.projects[i] == proj){
                    this.projects[i].worker = pers;
                    this.projects[i].worker.doProject = i;
                    testDepartment.workers[w] = director.projects[i].worker;
                }    
            }
        }
    }
}

class Departments extends Director{
    workers = []
    constructor(option,projects){
      super(projects);
      this.type = option.type;
    }
    

    set addProjectFromDirector(listProject){
      for(let item in listProject){
        if (listProject[item].type === this.type && listProject[item].inWork === false && listProject[item].worker === undefined){
          for(let person in this.workers){
            if(this.workers[person].working === false && this.workers[person].doProject === '0'){
                director.recruit(this.workers[person],item,person);   
            }
          }
          director.recruit();
        }  
      }
      console.log(this)
    }
                  
    set work(listProject){

      for(let item in director.projects){
        // console.log('object!!! :>>',this.type,director.projects[item].type, director.projects[item]);
        if(this.type === director.projects[item].type && director.projects[item].inWork === true){
            
          director.projects[item].statusDone += 1;
        }
        if((director.projects[item].hard === 0 && director.projects[item].statusDone === 1) ||
        (director.projects[item].hard === 1 && director.projects[item].statusDone === 2) ||
        (director.projects[item].hard === 2 && director.projects[item].statusDone === 3)){
          director.projects[item].done = true;
          director.projects[item].worker.donesProj += 1;
          director.projects[item].worker.doProject = '0';
          director.projects[item].worker.working = false;
          delete director.projects[item].worker;
          testDepartment.testing = director.pushProjects
        }
        

        for(let worker in this.workers){
          if(this.workers[worker].working === true){
            this.workers[worker].badDay = 0;
          }else{
            this.workers[worker].badDay += 1;
          }
        }

      } 
    }

    set testing(listProject){
      for(let i in listProject){
        if(listProject[i].done === true){
          if(this.workers.length === 0){
            director.recruitTester(listProject[i]);
          }else{
            for(let worker in this.workers){
              if(listProjectect[i].worker === undefined && this.workers[worker].working === true){
                  director.recruitTester(listProject[i],this.workers[worker],worker);
              }
            }
          }
          if(listProject[i].statusTest = 1 ){
              director.projects[i].worker.donesProj += 1;
              director.projects[i].worker.doProject = '0';
              director.projects[i].worker.working = false;
              delete director.projects[i].worker;
              delete director.projects[i];
              relise +=1;
          }
          
        }         
      }  
    } 
    deleteProgrammer(){
      for(let worker in this.workers){
          if(this.workers[worker].badDay >= 3){
              delete this.workers[worker];
              remWorker +=1;
          }else{
            this.workers[worker].badDay +=1;
          }
      }
    }
    
}

class Worker{
    constructor(type,working,doProject,donesProj,badDay){
        this.type = type;
        this.working = working;
        this.doProject = doProject;
        this.donesProj = donesProj;
        this.badDay = badDay;
    }
}


const director = new Director([]);
const webDepartment = new Departments({type: 0});
const mobileDepartment = new Departments({type: 1})
const testDepartment = new Departments({type: 'test'})

function company(day){
    for(let i = 0;i < day;i++){
        // director.recruit();
        director.addNewProjects = Math.round(Math.random() * 4);

        console.log(`Day ${i+1} \n\n list:>> `,director.pushProjects);

        console.log('Web');
        webDepartment.addProjectFromDirector = director.pushProjects
        console.log('Mobile')
        mobileDepartment.addProjectFromDirector = director.pushProjects
        webDepartment.work = director.pushProjects;
        mobileDepartment.work = director.pushProjects;
        webDepartment.deleteProgrammer();
        mobileDepartment.deleteProgrammer();
        testDepartment.deleteProgrammer();
        
        
        console.log('Test')
        console.log(testDepartment);
        console.log(' list:>> ',director.pushProjects);
        
        console.log('---------------------------------')
        // console.log('webDepartament >>', webDepartment);
        // console.log('mobileDepartament >>', mobileDepartment);
        console.log('testDepartament >>',testDepartment);
        console.log('-------------end----------------')
    }

    console.log(`Нанято рабочих ${addWorker}\n Уволено рабочих ${remWorker}\n Реализовано проектов ${relise}`);
}
company(10);

