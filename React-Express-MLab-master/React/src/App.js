import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state={nama:'',usia:'',alamat:'',pegawai:[]}
  }
  klik(){
    this.setState({
      nama  : this.refs.nama.value,
      usia  : this.refs.usia.value,
      alamat: this.refs.alamat.value
    });
  }
  klik2(){
    var x = this.state.nama;
    var y = this.state.usia;
    var z = this.state.alamat;
    axios.post('http://localhost:3300/data',{
      nama   : x,
      usia   : y,
      alamat : z
    })
  }
  klik3(){
    axios.get('http://localhost:3300/data')
    .then((ambilData)=>{
      console.log(ambilData.data);
      this.setState({
        pegawai: ambilData.data,
      })
    })
  }

  render() {
    const data   = this.state.pegawai.map((item, index)=>{
      var nama   = [item.nama]
      var usia   = [item.usia]
      var alamat = [item.alamat]
      return <tr key={index}><td>{nama}</td><td>{usia}</td><td>{alamat}</td></tr>;
    })
    return (
      <div>
      <center>
      <h1>REACT - EXPRESS - MLAB</h1>
      <h1>DATA PEGAWAI</h1>
      <div className="row">
              <input className="form-control" ref="nama" type="text" placeholder="Masukkan Nama"  onInput={()=>{this.klik();}}/><br/>
              <input className="form-control" ref="usia" type="number" placeholder="Masukkan Usia" onInput={()=>{this.klik();}}/><br/>
              <input className="form-control" ref="alamat" type="text" placeholder="Masukkan Alamat" onInput={()=>{this.klik();}}/><br/>
              <button type="submit" className="btn btn-primary btn-block" onClick={()=>{this.klik2();}}>POST</button>&nbsp;&nbsp;
              <button type="submit" className="btn btn-primary btn-block" onClick={()=>{this.klik3();}}>GET</button>
            </div>
      <br/>
      <tr className="head">
            <td>Nama</td>
            <td>Usia</td>
            <td>Alamat</td>
          </tr>
      {data}
    
      </center>
      </div>
    );
  }
}

export default App;

