/**
  * Created by martin on 18/04/19.
  */
object course2 extends App {

  sealed trait Pure[A] {
    @scala.annotation.tailrec final def interpret: A = this match {
      case Done(a) => a
      case Call(t) => t().interpret
    }
  }

  case class Done[A](a: A) extends Pure[A]
  case class Call[A](t: () => Pure[A]) extends Pure[A]

  def odd[A](l: List[A]): Pure[Boolean] =
    if (l.isEmpty) Done(false) else Call(() => even(l.tail))

  def even[A](l: List[A]): Pure[Boolean] =
    if (l.isEmpty) Done(true) else Call(() => odd(l.tail))

  def A(m: Int, n: Int): Int = {
    if (m >= 4 && n > 0) -1
    else if (m == 0) n + 1
    else if (m > 0 && n == 0) A(m - 1, 1)
    else A(m - 1, A(m, n - 1))
   // else -1
  }

  odd((1 until 1000000).toList)

  println(A(4,1))

  val msg = "m: %d and n: %d gives result %d"

  for {
    a <- List(0, 1, 2, 3, 4)
    b <- List(0,1,2,3,4)
  } yield println(msg.format(a, b, A(a,b)))

  val tests: List[(Int, Int, Int)] = List((0,0,1), (0, 1, 2), (0,2,3), (0, 3, 4),(0,4,5),
                                          (1, 0, 2),(1,1,3), (1, 2, 4), (1, 3, 5), (1,4,6),
                                          (2,0,3), (2, 1, 5), (2,2,7), (2, 3, 9),(2,4,11),
                                          (3, 0, 5),(3,1,13), (3, 2, 29), (3, 3, 61), (3,4,125), (4, 0, 13))

  def test(): Unit = {
    for {
      a <- tests
    } yield assert(A(a._1, a._2) == a._3)
    println("All tests passed")
  }



  test()
}


