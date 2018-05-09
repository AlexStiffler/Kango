using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Net.Mail;
/// <summary>
/// Summary description for DAL_Class
/// </summary>
public class DAL_Class
{

    public DAL_Class()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    public DataTable FillDataTable(string procedurename, string[] param, string[] value)
    {
        DataTable dt = new DataTable();
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["conStr"].ConnectionString);
            SqlDataAdapter adp = new SqlDataAdapter(procedurename, con);
            adp.SelectCommand.CommandType = CommandType.StoredProcedure;
            for (int i = 0; i < param.Length; i++)
            {
                adp.SelectCommand.Parameters.AddWithValue(param[i], value[i]);
            }
            adp.Fill(dt);
        }
        catch (Exception) { }
        return dt;
    }
    public DataTable FillDetails(string Action)
    {
        DataTable dt = new DataTable();
        try
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["conStr"].ConnectionString);
            SqlDataAdapter adp = new SqlDataAdapter("rms_getDetails", con);
            adp.SelectCommand.CommandType = CommandType.StoredProcedure;
            adp.SelectCommand.Parameters.AddWithValue("@Action", Action);
            adp.Fill(dt);
        }
        catch (Exception) { }
        return dt;
    }
    public bool sendMail(string ToAddress, string body, string Subject, string Attachment)
    {
        Boolean flag = false;
        try
        {

            MailMessage msg = new MailMessage();
            string[] toadd = ToAddress.Split(',');
            if (toadd.Length == 1)
            {
                msg.To.Add(ToAddress);
            }
            else
            {
                for (int i = 0; i < toadd.Length; i++)
                {
                    try
                    {

                        msg.To.Add(toadd[i]);

                    }
                    catch (Exception) { }
                }
            }
            msg.From = new MailAddress(ConfigurationManager.AppSettings["SenderEmailId"], "donotreply");
            msg.Subject = Subject;
            if (Attachment != string.Empty)
            {
                Attachment attach = new Attachment(Attachment);
                msg.Attachments.Add(attach);
            }
            msg.IsBodyHtml = true;
            msg.Body = body;
            SmtpClient smtp = new SmtpClient(ConfigurationManager.AppSettings["SMTPServer"]);
            System.Net.NetworkCredential nc = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["SenderEmailId"], ConfigurationManager.AppSettings["SenderPassword"]);
            smtp.UseDefaultCredentials = false;
            smtp.EnableSsl = ConfigurationManager.AppSettings["SMTPServer"].ToLower().Contains("smtp.") ? true : false;
            smtp.Credentials = nc;
            smtp.Port = ConfigurationManager.AppSettings["SMTPServer"].ToLower().Contains("smtp.") ? 587 : 25;
            // smtp.Port = ConfigurationManager.AppSettings["SMTPServer"].ToLower().Contains("smtp.") ? 3535 : 25;
            smtp.Send(msg);
            flag = true;
        }
        catch (Exception ex)
        {

        }
        return flag;
    }
    public bool sendMail(string ToAddress, string bcc, string body, string Subject, System.IO.Stream Attachment, string AttachmentName, string BccToAddress)
    {
        Boolean flag = false;
        //try
        //{

        MailMessage msg = new MailMessage();
        string[] toadd = ToAddress.Split(',');
        if (toadd.Length == 1)
        {
            msg.To.Add(ToAddress);
        }
        else
        {
            for (int i = 0; i < toadd.Length; i++)
            {
                //try
                //{

                msg.To.Add(toadd[i]);

                //}
                //catch (Exception) { }
            }
        }
        if (BccToAddress != null)
        {

            msg.Bcc.Add(BccToAddress);

        }
        msg.From = new MailAddress(ConfigurationManager.AppSettings["SenderEmailId"], "donotreply");
        msg.Subject = Subject;
        if (Attachment != null)
        {
            Attachment attach = new Attachment(Attachment, AttachmentName);
            msg.Attachments.Add(attach);
        }
        msg.IsBodyHtml = true;
        msg.Body = body;
        msg.Bcc.Add(new MailAddress(bcc));
        SmtpClient smtp = new SmtpClient(ConfigurationManager.AppSettings["SMTPServer"]);
        System.Net.NetworkCredential nc = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["SenderEmailId"], ConfigurationManager.AppSettings["SenderPassword"]);
        smtp.UseDefaultCredentials = false;
        smtp.EnableSsl = ConfigurationManager.AppSettings["SMTPServer"].ToLower().Contains("smtp.") ? true : false;
        smtp.Credentials = nc;
        smtp.Port = ConfigurationManager.AppSettings["SMTPServer"].ToLower().Contains("smtp.") ? 587 : 25;
        //  smtp.Port = ConfigurationManager.AppSettings["SMTPServer"].ToLower().Contains("smtp.") ? 3535 : 25;
        smtp.Send(msg);
        flag = true;
        //}
        //catch (Exception ex)
        //{

        //}
        return flag;
    }
}