import React, { Component } from 'react';
import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
import {filter,includes,orderBy as funcOrderBy,remove,reject} from 'lodash';
//import tasks from './mocks/tasks';
const uuidv4 = require('uuid/v4');

class App extends Component {
    state = {
        items: [],
        isShowForm: false,
        strSearch: '',
        orderBy: 'name',
        orderDir: 'asc',
        itemSelected: null
    };

    constructor(props) {
        super(props);

        //this.handleToggleForm = this.handleToggleForm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.closeForm = this.closeForm.bind(this);
        //this.handleSort = this.handleSort.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount(){
        let items = JSON.parse(localStorage.getItem("tasks")) || [];//if array is empty then set array = empty []
        this.setState({
            items: items,
        });
    }

    handleSubmit(item){
        //console.log(item);
        let {items} = this.state;
        let id = null;

        if(item.id !== ''){ //edit
            items = reject(items, {id:item.id});
            id = item.id;
        } else { //add
            id = uuidv4();      
        }
        items.push({
            id: id,
            name: item.name,
            level: +item.level
        });  

        this.setState({
            items: items,
            isShowForm: false
        });

        localStorage.setItem("tasks", JSON.stringify(items));
    }

    handleEdit(item){
        this.setState({
            itemSelected: item,
            isShowForm: true
        });
    }

    handleDelete(id){
        let items = this.state.items;
        remove(items, (item) => {
            return item.id === id;
        });
        this.setState({
            items: items
        });

        localStorage.setItem("tasks", JSON.stringify(items));
    }

    handleSort = (orderBy, orderDir) => {
        this.setState({
            orderBy: orderBy,
            orderDir: orderDir,
        });
    }

    handleToggleForm = () => {
        this.setState({
            isShowForm: !this.state.isShowForm,
            itemSelected: null
        });
    }

    handleSearch(value){
        this.setState({
            strSearch: value
        });
    }

    closeForm(){
        this.setState({
            isShowForm: false
        });
    }

    render() {
        let elmForm = null;        
        let itemsOrigin = (this.state.items !== null) ? [...this.state.items] : [];
        let items = [];
        let {orderBy, orderDir, isShowForm, strSearch, itemSelected} = this.state;
        
        //search
        items = filter(itemsOrigin, (item) => {
            return includes(item.name.toLowerCase(), strSearch.toLowerCase());
        });

        //sort
        items = funcOrderBy(items, [orderBy], [orderDir]);

        /*
        itemsOrigin.push("123");
        console.log("itemsOrigin", itemsOrigin);
        console.log("this.state.items", this.state.items);
        */
        /*
        if(search.length > 0){
            itemsOrigin.forEach((item) => {
                if(item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1){
                    items.push(item);
                }
            })
        }else{
            items = itemsOrigin;
        }
        */

        if(isShowForm){
            elmForm = <Form itemSelected={itemSelected} onClickSubmit={this.handleSubmit} onClickCancel={this.closeForm} />;
        }
        
        return (
            <div>
                <Title />

                <Control 
                    orderBy={orderBy}
                    orderDir={orderDir}
                    onClickSearchGo={this.handleSearch}
                    onClickSort={this.handleSort}
                    onClickAdd={this.handleToggleForm} 
                    isShowForm={isShowForm} 
                />

                {elmForm}

                <List 
                    onClickEdit={this.handleEdit}
                    onClickDelete={this.handleDelete}
                    items={items} 
                />         
            </div>
        );
    }
}

export default App;
