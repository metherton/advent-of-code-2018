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


  val bla1 = 45
  println(bla1.toString.toList(0))

  // return given number as list of digits
// val toDigits: (i: Int) => List[Int]
  // return given number as a reversed list of digits
//  val toDigitsRev: (i: Int) => List[Int]
  // return given list of digits with every second digit doubled
//  val doubleSecond: List[Int] => List[Int]
  // return sum of given list of digits
//  val sumDigits: List[Int] => Int
  // returh whether give number is vlad
  // this is wehn number n mod 10 is true when  passed as input to (sumDigits compose doubleSecond compose toDigitsRev)
//  val isValid: (i: Int) => Boolean


  // validate a list of numbers and return the number of valid numbers
 // numValid List[Int] => Integer

  val toDigits = (n: Long) => {

    def loop(i: Int, acc: List[Long]): List[Long] = {
      if (n.toString.length == 0)  List()
      else if (i == n.toString.length) acc
      else loop(i + 1, acc :+ (n.toString.charAt(i).toInt - 48).toLong)
    }
    loop(0, List())
  }

  val myLong: Long = 375213257576161L // answer should be 50 when sumDigits
  println(toDigits(myLong))

  val myLongs = List(1L, 2L, 3L, 4L)

  val toDigitsRev = (n: Long) => {

    def loop(i: Int, acc: List[Long]): List[Long] = {
      if (n.toString.length == 0)  List()
      else if (i == 0) acc
      else loop(i - 1, acc :+ (n.toString.charAt(i - 1).toInt - 48).toLong)
    }

    loop(n.toString.length, List())
  }

  println(toDigitsRev(myLong))

  val doubleSecond = (l: List[Long]) => {

    def loop(i: Int, acc: List[Long]): List[Long] = {
      if (l.length == 0)  List()
      else if (i == l.length) acc
      else if (i % 2 == 1) loop(i + 1, acc :+ l(i) * 2)
      else loop(i + 1, acc :+ l(i))
    }
    loop(0, List())
  }



  println(doubleSecond(toDigitsRev(myLong)))


//  val sumDigits = (l: List[Long]) => {
//
//    def loop(i: Int, acc: Int): Int = {
//      if (l.length == 0)  0
//      else if (i == l.length) acc
//      else loop(i + 1, acc + l(i).toInt)
//    }
//    loop(0, 0)
//  }

  val sumDigits: List[Long] => Long = l => l match {
    case Nil => 0
    case h :: t => toDigits(h).sum + sumDigits(t)
  }

//    def loop(i: Int, acc: Int, index: Int): Int = {
//      if (l.length == 0)  0
//      else if (i == l.length) acc
//      else if (l(i).toString.length == 1)  loop(i + 1, acc + l(i).toInt, 0)
//      else loop(i, acc + l(i).toString.toList(index).toInt - 48, 1)
//    }
//    loop(0, 0, 0)
//    l match {
//      case Nil => 0
//      case h :: t => toDigits(h).sum + sumDigits(t)
//    }
//    45
//  }


 // println(sumDigits(doubleSecond(toDigitsRev(myLong))))

  val creditCards =  List(4716347184862961L, 4532899082537349L, 4485429517622493L)
//  val creditCards =  List(3L, 3L, 3)

//  val isValid = (n: Long) => {
//    (sumDigits compose doubleSecond compose toDigitsRev(n)) % 10 == 0
//  }

  val isValid: Long => Boolean = n =>
    (sumDigits compose doubleSecond compose toDigitsRev)(n) % 10 == 0


  println(isValid(myLong))

  val bla = doubleSecond compose toDigitsRev
  println(bla(3))

  println(doubleSecond(toDigitsRev(myLong)))

  println(sumDigits(List(12,3,5)))
}
