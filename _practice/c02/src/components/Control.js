import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(){
      this.props.onClickAdd();
    }

    render() {
        let {orderBy, orderDir} = this.props;
        //console.log(orderBy, orderDir);

        let elmButton = <button onClick={this.handleAdd} type="button" className="btn btn-info btn-block">Add Task</button>;
        if(this.props.isShowForm === true){
          elmButton = <button onClick={this.handleAdd} type="button" className="btn btn-success btn-block">Close Form</button>
        }

        return (
            <div className="row">
              <Search onClickGo={this.props.onClickSearchGo}/>

              <Sort 
                onClickSort={this.props.onClickSort}
                orderBy={orderBy}
                orderDir={orderDir}
              />

              <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                {elmButton}                
              </div>
            </div>
        );
    }
}

export default Control;
