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
      } 
    }

    // get pushProjects(){
    //   return this.projects;   
    // }

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
              this.projects[i].worker.working = true;
              testDepartment.workers[`worker${parseInt(Object.keys(testDepartment.workers).length)}`] = director.projects[i].worker;
              director.projects[i].statusTest += 1;
              addWorker +=1;
            }    
          }
        }else{
          for(let i in this.projects){ 
            if(this.projects[i] == proj){
              this.projects[i].worker = pers;
              this.projects[i].worker.working = true;
              this.projects[i].worker.doProject = i;
              testDepartment.workers[w].working = true;
              testDepartment.workers[w].doProject = i;
              director.projects[i].statusTest += 1;

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
          // if(this.type === 1){
            
          // }
          
        }  
      }
      console.log(this);
    }
                  
    set work(listProject){

      for(let item in director.projects){
        if(this.type === director.projects[item].type && director.projects[item].inWork === true){
          director.projects[item].statusDone += 1;
        }
        if((director.projects[item].hard === 0 && director.projects[item].statusDone === 1) ||
        (director.projects[item].hard === 1 && director.projects[item].statusDone === 2) ||
        (director.projects[item].hard === 2 && director.projects[item].statusDone === 3)){
          director.projects[item].done = true;
          for(let worker in this.workers){
            if (item === this.workers[worker].doProject){
              this.workers[worker].donesProj += 1;
              this.workers[worker].doProject = '0';
              this.workers[worker].working = false; 
            }
          }
          delete director.projects[item].worker;
          testDepartment.testing = director.project
        }
        
      } 
    }

    set testing(listProject){
      for(let i in director.projects){
        if(director.projects[i].done === true){
          for(let worker in this.workers){
            console.log('object :>> ', i, director.projects);
            if(!director.projects[i].worker && this.workers[worker].working === false && director.projects[i]){
              director.recruitTester(director.projects[i],this.workers[worker],worker);
            }
            
            if(director.projects[i].statusTest === 1 && i === this.workers[worker].doProject){
                this.workers[worker].donesProj += 1;
                this.workers[worker].doProject = '0';
                this.workers[worker].working = false;
                delete director.projects[i];
                relise +=1;
            }
            
          }
          director.recruitTester(director.projects[i]);
        }         
      }  
    } 
    deleteProgrammer(){
      for(let worker in this.workers){
        if(this.workers[worker].working === false){
          this.workers[worker].badDay += 1;
        }else{
          this.workers[worker].badDay = 0;
        }
        if(this.workers[worker].badDay === 3 ){
          delete this.workers[worker];
          remWorker +=1;
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
      if(i != 0 ){
        director.recruit();
      }
        director.addNewProjects = Math.round(Math.random() * 4);

        console.log(`Day ${i+1} \n\n list:>> `,director.projects);

        console.log('Web');
        webDepartment.addProjectFromDirector = director.projects
        console.log('Mobile')
        mobileDepartment.addProjectFromDirector = director.projects
        
        webDepartment.work = director.projects;
        mobileDepartment.work = director.projects;
        webDepartment.deleteProgrammer();
        mobileDepartment.deleteProgrammer();
        testDepartment.deleteProgrammer();
        
        
        console.log('Test')
        console.log(testDepartment);
        // console.log(' list:>> ',director.pushProjects);
        
        console.log('---------------------------------')
        // console.log('webDepartament >>', webDepartment);
        // console.log('mobileDepartament >>', mobileDepartment);
        console.log('testDepartament >>',testDepartment);
        console.log('-------------end----------------')
    }

    console.log(`Нанято рабочих ${addWorker}\n Уволено рабочих ${remWorker}\n Реализовано проектов ${relise}`);
}
company(100);

