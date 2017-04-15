using Xunit;
using dotnetcore_mvc.BusinessLogic;

namespace dotnet_test
{
  public class UnitTest1
  {
    [Fact]
    public void Test1()
    {
      Assert.Equal(Logic.plus(1, 2), 3);
    }
    [Fact]
    public void Test2()
    {
      Assert.Equal(Logic.plus(1, 4), 5);
    }
    [Fact]
    public void Test3()
    {
      Assert.Equal(Logic.plus(1, 4), 5);
    }
    [Fact]
    public void Test4()
    {
      Assert.Equal(Logic.plus(1, 4), 5);
    }
    [Fact]
    public void Test5()
    {
      Assert.Equal(Logic.plus(1, 4), 5);
    }
    [FactAttribute]
    public void Test6()
    {
        Assert.Equal(4, 4);
    }
  }
}
