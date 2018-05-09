using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.IO;

public partial class Index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            reset();
        }
    }
    void reset()
    {
        txtname.Text = string.Empty;
        txtemailid.Text = string.Empty;
        txtphone.Text = string.Empty;
    }
    protected void btnsend_Click(object sender, EventArgs e)
    {
        try
        {
            //Lead Entry
            if (txtname.Text == string.Empty)
                return;

            DAL_Class dal = new DAL_Class();
            StringBuilder stringBuilder1 = new StringBuilder();
            stringBuilder1.Append(string.Concat(new string[]
                {
                    "<p style='font-family: Helvetica, Arial, sans-serif;font-size:14px;line-height: 1.5;color: #222;padding: 0'>Dear ",
                    this.txtname.Text.Trim(),",</p>",
                    "<h1 style='font-family: Helvetica, Arial, sans-serif;line-height: 1.5;color: #000;padding: 0'>Thank you for your believe in KanGoKiwi!</p><br/>",
                    "<h4 style='font-family: Helvetica, Arial, sans-serif;line-height: 1.5;color: #222;padding: 0'>Your message has been sent successfully.</h4>",
                    "<p style='font-size:14px;font-family: Helvetica, Arial, sans-serif;line-height: 1.5;color: #222;padding: 0'>One of our expert counsellor will get in touch with you, at earliest.</p>",
                    "<br/><p style='font-size:14px;font-family: Helvetica, Arial, sans-serif;line-height: 1.5;color: #222;padding: 0'>Regards,</p><br/>",
                    "<img src='http://akhilsharma.co/assets/image/kangokiwi-study-abroad-consultant-logo2.png' />",
                    "<h3>KanGoKiwi STUDY ABROAD CONSULTANT</h3>",
                    "<p style='font-size:14px;font-family: Helvetica, Arial, sans-serif;line-height: .5;color: #222;padding: 0'>Phone: <a href='tel:+918860123444'>+91 8860123444</a></p>",
                    "<p style='font-size:14px;font-family: Helvetica, Arial, sans-serif;line-height: .5;color: #222;padding: 0'>Address: Basement, Bhagwan Sahay Complex, Naya Bans, Sector 15, Noida - 201301</p>",
                    "<p style='font-size:14px;font-family: Helvetica, Arial, sans-serif;line-height: .5;color: #222;padding: 0'>Website: <a href='http://kangokiwi.in'>www.kangokiwi.in</a></p>",
                    "<p style='font-size:14px;font-family: Helvetica, Arial, sans-serif;line-height: .5;color: #222;padding: 0'>Email: <a href='mailto:enquiry@kangokiwi.com' target='_blank'>kangokiwi.noida@gmail.com</a></p>"
                }));
            dal.sendMail(this.txtemailid.Text.Trim(),"akhilonline.9@gmail.com", stringBuilder1.ToString(), "KanGokiwi Noida : Test Prep | Study Abroad Consultant", null, null,null);
           
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append(string.Concat(new string[]
                {
                    "<h3 style='text-align: center'>Enquiry from Google Campaign : www.kangokiwi.in</h3><table style='border: 1px solid #ddd;width: 100%;max-width: 100%;margin-bottom: 20px;border-spacing: 0;border-collapse: collapse;'><tbody style='display: table-row-group;vertical-align: middle;border-color: inherit;'><tr><td style='font-size:14px;border: 1px solid #ddd;width:30%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'><b>Name </b>:</td><td style='font-size:14px;border: 1px solid #ddd;width:70%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'>",
                    this.txtname.Text.Trim(),
                    "</td></tr><tr><td style='font-size:14px;border: 1px solid #ddd;width:30%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'><b>Email ID</b> : </td><td style='font-size:14px;border: 1px solid #ddd;width:70%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'>",
                    this.txtemailid.Text.Trim(),
                    "</td></tr><tr><td style='font-size:14px;border: 1px solid #ddd;width:30%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'><b>Mobile Number</b> : </td><td style='font-size:14px;border: 1px solid #ddd;width:70%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'>",
                    this.txtphone.Text.Trim(),
                     "</td></tr><tr><td style='font-size:14px;border: 1px solid #ddd;width:30%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'><b>Degree</b> : </td><td style='font-size:14px;border: 1px solid #ddd;width:70%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'>",
                    RadioButtonList1.SelectedValue,
                     "</td></tr><tr><td style='font-size:14px;border: 1px solid #ddd;width:30%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'><b>Country</b> : </td><td style='font-size:14px;border: 1px solid #ddd;width:70%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'>",
                    ddlcountry.SelectedValue,
                     "</td></tr><tr><td style='font-size:14px;border: 1px solid #ddd;width:30%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'><b>Course</b> : </td><td style='font-size:14px;border: 1px solid #ddd;width:70%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'>",
                    RadioButtonList2.SelectedValue,
                    "</td></tr><tr><td style='font-size:14px;border: 1px solid #ddd;width:30%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'><b>IP Address</b> : </td><td style='font-size:14px;border: 1px solid #ddd;width:70%;padding: 8px;line-height: 1.42857143;vertical-align: top;border-top: 1px solid #ddd;'>",
                    this.GetIPAddress()
                }));
            stringBuilder.Append("</td></tr></tbody></table><br/><br/></br>");
            dal.sendMail("kangokiwi.noida@gmail.com, neeraj.kangokiwi@gmail.com", "akhilonline.9@gmail.com", stringBuilder.ToString(), "Online Enquiry Form", null, null,null);
            ScriptManager.RegisterStartupScript(this, GetType(), "showalert", "alert('Form Submitted successfully');", true);
            
        }
        catch (Exception ex)
        {
            ex.ToString();
            //ScriptManager.RegisterStartupScript(this, GetType(), "showalert", "alert('Code in Catch!');", true);
            // this.sendMail("akhilonline.9@gmail.com", "Mail from Kangokiwi enquiry", ex.Message.ToString() + ";" + this.txtname.Text.Trim() + "," + this.txtemailid.Text.Trim() + "," + this.txtphone.Text.Trim() + "," + this.txtmessage.Text.Trim(), "Enquiry From Cloud based School Management ERP", "", null);
        }
        this.reset();
        Response.Redirect("http://www.kangokiwi.com/ielts-coaching-noida/");

    }
    public string GetIPAddress()
    {
        string ipaddress;
        ipaddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        if (ipaddress == "" || ipaddress == null)
        {
            ipaddress = Request.ServerVariables["REMOTE_ADDR"];
        }
        return ipaddress;
    }
}