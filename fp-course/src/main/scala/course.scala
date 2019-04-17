/**
  * Created by martin on 17/04/19.
  */

trait WithPrint {
  def print(s: String) = println(s)

  def prefix: String
}


class Foo(val i: Int) extends WithPrint {
  def prefix = "> "
}


case class Baz(s: String)

class Bar() {}

object Bar {
  def barry = println("I'm barry")
}

object course extends App {

  val foo = new Foo(0)



  val baz = Baz("marco")

  foo.print("foo constructed with " + baz)

  Bar.barry

}
