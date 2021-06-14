import React, { Component } from 'react';
import axios from 'axios';

export default class EditItem extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeTensp = this.onChangeTensp.bind(this);
        this.onChangeDanhmuc = this.onChangeDanhmuc.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          tensp: '',
          danhmuc:'',
          cats: []
        }
      }

    componentDidMount() {
        axios.get('http://localhost:5000/product/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              tensp: response.data.Name,
              danhmuc: response.data.Category_id
              //duration: response.data.duration,
              //date: new Date(response.data.date)
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
          fetch('http://localhost:5000/danhmuc/') 
          .then(res => res.json()) 
          .then((data) => 
              { this.setState({ cats: data }) 
          }).catch(console.log)
    }
    renderCat = () => {
        let cats = this.state.cats.map((data, index) =>
        <option value={data._id}>{data.Title}</option>
        ); 
        return cats; }
    //send data to server
   
      onChangeTensp(e) {
        this.setState({
            tensp: e.target.value
        })
      }
      onChangeDanhmuc(e) {
        this.setState({
            danhmuc: e.target.value
        })
      }
  render() {
    return (
      <div>
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Chỉnh sửa thông tin sản phẩm
    </h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        
        <a href="./"><button type="button" class="btn btn-sm btn-outline-secondary">
                Trở về
            </button></a>
    </div>
</div>
<form>
    <div class="form-group">
        <label for="tensp">Tên sản phẩm</label>
        <input type="text" class="form-control" name="tensp" placeholder="Tên sản phẩm" required
        value={this.state.tensp}
        onChange={this.onChangeTensp}
        />
    </div>
    <div class="form-group">
        <label for="danhmuc">Danh mục sản phẩm</label>
        <select class="custom-select d-block w-100" id="danhmuc" name="danhmuc"
        value={this.state.danhmuc}
        onChange={this.onChangeDanhmuc}>
            <option value="">Choose...</option>
            {this.renderCat()}
        </select>
    </div>
    <div class="form-group">
        <label for="gia">Giá</label>
        <input type="text" class="form-control" name="txtgia" id="txtgia" placeholder="100000"/>
    </div>
    <div class="form-group">
        <label for="mota">Mô tả</label>
        <textarea name="txtmota" id="txtmota" class="form-control" id="textarea"></textarea>
    </div>
    <div class="form-group">
        <input type="submit" class="btn btn-lg btn-primary" value="Add new"/>
    </div>
</form>
      </div>
    )
  }
}