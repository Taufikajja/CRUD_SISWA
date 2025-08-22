create database if not exists db_siswa;
use db_siswa;

create table if not exists Siswa (
Kode_Siswa varchar(10) primary key,
Nama_Siswa varchar(50),
Alamat_Siswa varchar(255),
Tgl_Siswa date,
Jurusan_Siswa varchar(50)
);

insert into Siswa (Kode_Siswa, Nama_Siswa, Alamat_Siswa, Tgl_Siswa, Jurusan_Siswa) values 
('S001','Taufik','Sumedang','2001-01-01','Teknik Komputer Jaringan'),
('S002','Budi','Bandung','2001-02-01','Teknik Informatika'),
('S003','Siti','Jakarta','2001-03-01','Sistem Informasi')
;

select * from Siswa;
