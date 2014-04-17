using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Gamestats.Startup))]
namespace Gamestats
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
