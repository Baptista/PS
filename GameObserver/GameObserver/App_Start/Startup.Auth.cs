using System.Web.Security;
using GameObserver.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

namespace GameObserver
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            //if(!Roles.RoleExists("admin"))
            //    Roles.CreateRole("admin");

            var rm = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
            
            if (!rm.RoleExists("admin"))
            {
                var result = rm.Create(new IdentityRole("admin"));
                    var um = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
                    var user = new ApplicationUser() {UserName = "adminn"};
                    um.Create(user, "asdfgh");
                    UserLoginInfo info = new UserLoginInfo("Google",
                            "https://www.google.com/accounts/o8/id?id=AItOawka6ZSrKNn7UY3ZUcjFRZMSLhMqQNKArWQ");
                    um.AddToRole(user.Id, "admin");
                    um.AddLogin(user.Id, info);
                            
                    
                    
                
            }
            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });
            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");

            //app.UseFacebookAuthentication(
            //   appId: "644643725630197",
            //   appSecret: "0ff6cb6d1745e716a75fda26d46b5d15");

            //app.UseGoogleAuthentication();
            app.UseGoogleAuthentication();
        }
    }
}