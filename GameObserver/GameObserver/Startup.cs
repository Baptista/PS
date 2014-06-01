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
        }
    }
}
