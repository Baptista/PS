using System;
using GameObserver.Models;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GameObserver.Startup))]
namespace GameObserver
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
            ConfigureAuth(app);
            CreateAdmin();
        }

        public void CreateAdmin()
        {
            var rm = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
            try
            {
                if (!rm.RoleExists("admin"))
                {
                    var result = rm.Create(new IdentityRole("admin"));
                    var um = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
                    var user = new ApplicationUser() { UserName = "adminn" };
                    um.Create(user, "asdfgh");
                    UserLoginInfo info = new UserLoginInfo("Google",
                            "https://www.google.com/accounts/o8/id?id=AItOawka6ZSrKNn7UY3ZUcjFRZMSLhMqQNKArWQ");
                    um.AddToRole(user.Id, "admin");
                    um.AddLogin(user.Id, info);

                }
            }
            catch (TimeoutException)
            {
                CreateAdmin();
                
            }
            
        }

    }
}
