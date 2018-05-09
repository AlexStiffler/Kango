  
create table ContactInfo(id bigint identity primary key,FullName varchar(200) default '',EmailId varchar(200) default '',
Subjects varchar(500) default '',Questions varchar(max) default '',contact_date datetime not null default getdate())
go
alter table ContactInfo add address varchar(300) default '',phone varchar(100) default ''

go
create proc rms_ContactInfo(@FullName varchar(200) = '',@EmailId varchar(200) = '',@Subjects varchar(500) = '',@Questions varchar(max) = '',@address varchar(300) = '',@phone varchar(100) = '')
as 
begin
insert into ContactInfo(FullName,EmailId,Subjects,Questions,address,phone)
select @FullName,@EmailId,@Subjects,@Questions,@address,@phone

select 1
end

go
create table RegistrationInfo(Rid bigint identity primary key,team_name varchar(200) default '',team_email varchar(200) default '',
team_phone varchar(100) default '',team_phonecode varchar(50) default '',team_password varchar(50) default '',registration_date datetime not null default getdate())
go
alter table RegistrationInfo add team_leader varchar(200) default '',team_address varchar(300) default '',team_university varchar(300) default ''
go
create proc rms_RegistrationInfo(@team_name varchar(200) = '',@team_email varchar(200) = '',@team_phone varchar(100) = '',@team_phonecode varchar(50) = '',@team_password varchar(50) = ''
,@team_leader varchar(200)= '',@team_address varchar(300)= '',@team_university varchar(300) = '')
as 
begin
if  not exists(select * from RegistrationInfo where team_email=@team_email)
begin
insert into RegistrationInfo(team_name,team_email,team_phone,team_phonecode,team_password,team_leader,team_address,team_university)
select @team_name,@team_email,@team_phone,@team_phonecode,@team_password,@team_leader,@team_address,@team_university

select 1
end
else
select 2
end

go

create proc rms_login(@login_id varchar(200))
as begin
select * from RegistrationInfo where team_email=@login_id order by Rid desc
end

go

create proc rms_getDetails(@Action varchar(200))
as begin
if(@Action='Registration')
begin
select ROW_NUMBER() over (order by rid desc) as SNo,* from RegistrationInfo  order by Rid desc
end
else if(@Action='Contact')
begin
select ROW_NUMBER() over (order by id desc) as SNo,* from ContactInfo  order by id desc
end
end

 