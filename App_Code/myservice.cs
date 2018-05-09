using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Text;
/// <summary>
/// Summary description for myservice
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class myservice : System.Web.Services.WebService {

    public myservice () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod]
    public string SaveContactDetails(string fullname, string emailid, string subject, string question, string address, string phone)
    {
        string strvalue=string.Empty ;
        try
        {
            string[] arr = { "@FullName", "@EmailId", "@Subjects", "@Questions", "@address", "@phone" };
            string[] arrvalue = { fullname.Trim(), emailid.Trim(), subject.Trim(), question.Trim(), address.Trim(), phone.Trim() };
            DAL_Class dal = new DAL_Class();
            DataTable dt = dal.FillDataTable("rms_ContactInfo", arr, arrvalue);
            StringBuilder sb = new StringBuilder();
            sb.Append("<h3>Contact Enquiry</h3><table><tr><td>Name</td><td>" + fullname + "</td></tr>");
            sb.Append("<tr><td>Email Id</td><td>" + emailid + "</td></tr>");
            sb.Append("<tr><td>Subject</td><td></td>" + subject + "</tr>");
            sb.Append("<tr><td>Question</td><td></td>" + question + "</tr>");
            sb.Append("<tr><td>Address</td><td></td>" + address + "</tr>");
            sb.Append("<tr><td>Phone</td><td></td>" + phone + "</tr>");
            sb.Append("</table>");            
            dal.sendMail("info@somaaindia.com,somaaindo@gmail.com",sb.ToString(), "Contact Detail : SomaaIndia.com", Server.MapPath("~/Uploads/Files/1473410180.pdf"));
            if (dt.Rows.Count > 0)
            {
                strvalue = "Information submit successfully";
            }
        }
        catch (Exception) { }
        return strvalue;
    }
    [WebMethod (EnableSession=true)]
    public string CheckLoginInfo(string login_id, string login_password)
    {
         string strvalue = string.Empty;
         try
         {
             string[] arr = { "@login_id" };
             string[] arrvalue = { login_id.Trim() };
             DAL_Class dal = new DAL_Class();
             DataTable dt = dal.FillDataTable("rms_login", arr, arrvalue);
             if (dt.Rows.Count > 0)
             {
                 if (dt.Rows[0]["team_password"].ToString() == login_password)
                 {
                     Session["LoginId"] = dt.Rows[0]["team_email"].ToString();
                     Session["Username"] = dt.Rows[0]["team_name"].ToString();
                 }
                 else
                 {
                     strvalue = "Invalid Password";
                 }

             }
             else
             {
                 strvalue = "Invalid Email Id";
             }
         }
         catch (Exception)
         {
             strvalue = "Invalid EmailId/Password";
         }
         return strvalue;
    }
     [WebMethod]
    public string SaveRegistrationDetails(string team_name, string team_email, string team_phone, string team_phonecode, string team_password, string team_leader, string team_address, string team_university)
    {

        string strvalue = string.Empty;
        try
        {
            string[] arr = { "@team_name", "@team_email", "@team_phone", "@team_phonecode", "@team_password", "@team_leader", "@team_address", "@team_university" };
            string[] arrvalue = { team_name.Trim(), team_email.Trim(), team_phone.Trim(), team_phonecode.Trim(), team_password.Trim(), team_leader.Trim(), team_address.Trim(), team_university.Trim() };
            DAL_Class dal = new DAL_Class();
            DataTable dt = dal.FillDataTable("rms_RegistrationInfo", arr, arrvalue);
            if (dt.Rows.Count > 0)
            {
                if (dt.Rows[0][0].ToString() == "1")
                {
                    strvalue = "Registration done successfully";
                    string body = "Dear " + team_leader + ",<br/><br/> You has been successfully registered.Your Account login credentials details are <<br/><b>Username : </b>" + team_email + "<br /><b>Password : </b>" + team_password + "<br /> <br/><br/>Thanks and Regards<br/>Administrator.";
                    dal.sendMail(team_email, body, "Thankyou for registration", Server.MapPath("~/Uploads/Files/somaa_workshop.pdf"));
                }
                else
                {
                    strvalue = "Email Id already exist";
                }
            }
        }
        catch (Exception) { }
        return strvalue;
    }
     [WebMethod]
     public string GetPasswordDetails(string team_email)
     {

         string strvalue = string.Empty;
         try
         {
             string[] arr = { "@login_id" };
             string[] arrvalue = { team_email.Trim() };
             DAL_Class dal = new DAL_Class();
             DataTable dt = dal.FillDataTable("rms_login", arr, arrvalue);
             if (dt.Rows.Count > 0)
             {
                 //if (dt.Rows[0][0].ToString() == "1")
                 //{
                     strvalue = "Please check your mail to get password";
                     string body = "Dear " + dt.Rows[0]["team_leader"].ToString() + ",<br/><br/> Your password for login is </b>" + dt.Rows[0]["team_password"].ToString() + "<br /> <br/><br/>Thanks and Regards<br/>Administrator.";
                     dal.sendMail(team_email, body, "Get Password", "");
                 //}
                
             }
             else
             {
                 strvalue = "Invalid Email Id";
             }
         }
         catch (Exception) { }
         return strvalue;
     }

}
