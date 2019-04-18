/**
  * Created by martin on 17/04/19.
  */

sealed trait LL[+A] {

  import LL._

  def flatMap[B](f: A => LL[B]): LL[B] = this match {
    case Nill => Nill
    case Cons(h, t) => append(f(h), t.flatMap(f) )
  }

  def map[B](f: A => B): LL[B] = this match {
    case Nill => Nill
    case Cons(h, t) => Cons(f(h), t.map(f))
  }

}

object LL {
  def append[A](la: LL[A], lb: LL[A]): LL[A] =
    la match {
      case Nill => lb
      case Cons(h, t) => Cons(h, append(t, lb))
    }
}

case object Nill extends LL[Nothing]
case class Cons[A](h: A, t: LL[A]) extends LL[A]

object course1 extends App {

  val l1 = Cons(5, Cons(3, Nill))
  println(l1.map(n => n * 2))

  def add(la: LL[Int], lb: LL[Int]): LL[Int] = for {
    a <- la
    b <- lb
  } yield a + b

  val as: LL[Int] = Cons(1, Cons(2, Nill))
  val bs: LL[Int] = Cons(10, Cons(20, Nill))

  println(add(as, bs))
}
