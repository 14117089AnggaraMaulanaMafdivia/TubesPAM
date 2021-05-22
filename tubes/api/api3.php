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
    $sql1 = "select * from pengeluaran order by id_pengeluaran desc";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id_pengeluaran' => $r1['id_pengeluaran'],
            'uang' => $r1['uang'],
            'keterangan' => $r1['keterangan'],
            'tgl' => $r1['tgl']
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
        $sql1 = "insert into pengeluaran (uang,keterangan) values ('$uang','$keterangan')";
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
    $id_pengeluaran = $_GET['id_pengeluaran'];
    $sql1 = "select * from pengeluaran where id_pengeluaran = '$id_pengeluaran'";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id_pengeluaran' => $r1['id_pengeluaran'],
            'uang' => $r1['uang'],
            'keterangan' => $r1['keterangan'],
            'tgl' => $r1['tgl']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update(){
    global $koneksi;
    $id_pengeluaran = $_GET['id_pengeluaran'];
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
        $sql1 = "update pengeluaran set ".implode(",",$set).",tgl=now() where id_pengeluaran = '$id_pengeluaran'";
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
    $id_pengeluaran = $_GET['id_pengeluaran'];
    $sql1 = "delete from pengeluaran where id_pengeluaran = '$id_pengeluaran'";
    $q1 = mysqli_query($koneksi,$sql1);
    if($q1){
        $hasil = "Berhasil menghapus data";
    }else{
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}