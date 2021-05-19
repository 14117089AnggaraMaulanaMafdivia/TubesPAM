<?php 
error_reporting(0);

$host = "localhost";
$user = "root";
$pass = "root";
$db   = "api";

$koneksi = mysqli_connect($host,$user,$pass,$db);

$op = $_GET['op'];
switch($op){
    case '':normal();break;
    default:normal();break;
    case 'create':create();break;
    case 'detail':detail();break;
    case 'update':update();break;
    case 'delete':delete();break;
}

function normal(){
    global $koneksi;
    $sql1 = "select * from pegawai order by id desc";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'uang' => $r1['uang'],
            'keterangan' => $r1['keterangan'],
            'tgl_input' => $r1['tgl_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function create(){
    global $koneksi;
    $uang = $_POST['uang'];
    $keterangan = $_POST['keterangan'];
    $hasil = "gagal dimasukan data";
    if($uang and $keterangan){
        $sql1 = "insert into pegawai(uang,keterangan) values ('$uang','$keterangan')";
        $q1 = mysqli_query($koneksi,$sql1);
        if(q1){
            $hasil = "berhasil menambahkan data";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function detail(){
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "select * from pegawai where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'uang' => $r1['uang'],
            'keterangan' => $r1['keterangan'],
            'tgl_input' => $r1['tgl_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update(){
    global $koneksi;
    $id = $_GET['id'];
    $uang = $_POST['uang'];
    $keterangan = $_POST['keterangan'];
    if($uang){
        $set[] = "uang='$uang'";
    }
    if($keterangan){
        $set[] = "keterangan='$keterangan'";
    }
    $hasil = "Gagal melakukan update data";
    if($uang or $keterangan){
        $sql1 = "update pegawai set ".implode(",",$set).",tgl_input=now() where id = '$id'";
        $q1 = mysqli_query($koneksi,$sql1);
        if($q1){
            $hasil = "Data berhasil diupdate";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function delete(){
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "delete from pegawai where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    if($q1){
        $hasil = "Berhasil menghapus data";
    }else{
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}