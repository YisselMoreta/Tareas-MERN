import React, {Component} from 'react';
import {render} from 'react-dom';


class App extends Component {
    constructor(){
        super();
        this.state = {
            titulo: '',
            descripcion:'',
            tareas: [],
            _id:''
        };
        this.addTask = this.addTask.bind(this);
         this.handleChange = this.handleChange.bind(this);
    }
    

    addTask(e) {
        e.preventDefault();

        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                 headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Tarea editada!'});
                this.setState({titulo: '', descripcion: '', _id: ''});
                this.fetchTasks();
                
                
                
            });
        }else{
            fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
        })
        
        .then(res => res.json())
        .then(data=> {
            console.log(data)
            M.toast({html: 'Tarea guardada!'});
            this.setState({titulo: '', descripcion: ''});
            this.fetchTasks();
        })
        .catch(error => console.log(error));
        
        }
        
    }
    componentDidMount(){
        this.fetchTasks();
    }



    fetchTasks() {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            
            this.setState({tareas: data});
            console.log(this.state.tareas);
        })
        .catch(error => console.log(error));
    }
    editTask (id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data=> {
                console.log(data)
                this.setState({
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    _id: data._id

                })
                
        })
    }

    deleteTask(id){
      if(confirm('Estás seguro de querer eliminarlo?')) {
           fetch(`/api/tasks/${id}`, {
           method: 'DELETE',
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
       
       } )
       .then(res => res.json())
        .then(data => {
            console.log(data);
             M.toast({html: 'Tarea eliminada!'});
             this.fetchTasks();
        })
        .catch(error => console.log(error));
      }
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    };

    render() {
        return (
            <div>
                {/*NAVEGACION*/}
              <nav className="light-blue darken-4">
              <div className="container">

              <a className="brand-logo" href="/">MERN</a>
              
              </div>
              </nav>
              <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                            <form onSubmit={this.addTask}  >
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="titulo"   onChange={this.handleChange} value={this.state.titulo} type="text" placeholder="titulo tarea" />
                        </div>
                </div>

                <div className="row">
                        <div className="input-field col s12">
                            <textarea name="descripcion"  onChange={this.handleChange} value={this.state.descripcion}className="materialize-textarea" placeholder="descripcion"></textarea>
                        </div>
                </div>
                <button type="submit" className="btn light-blue darken-4">Enviar</button>

                            </form>
                </div>
              </div>
              </div>
                <div className="col s7">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Descipción</th>

                        
                        </tr>
                    
                    </thead>
                    <tbody>
                    {
                        this.state.tareas.map(tareas => {
                        return(
                            <tr key={tareas._id} >
                                <td>{tareas.titulo}</td>
                                <td>{tareas.descripcion}</td>
                                <td>
                                    <button className="btn light-blue darken-4" onClick={()=> this.editTask(tareas._id)} >
                                        <i className="material-icons" >edit</i>
                                    </button>
                                    <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={()=> this.deleteTask(tareas._id)} >
                                         <i className="material-icons" >delete</i>
                                    </button>
                                
                                </td>
                            
                            </tr>
                        )
                        })
                    
                    }
                    
                    </tbody>
                
                
                
                </table>
              </div>

              </div>

              </div>
            
            
            </div>
        
        )
    }
}

export default App;