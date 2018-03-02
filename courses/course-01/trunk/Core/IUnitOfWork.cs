using System.Threading.Tasks;

namespace trunk.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
