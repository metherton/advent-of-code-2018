/**
  * Created by martin on 18/04/19.
  */
object course2 extends App {

  def A(m: Int, n: Int): Int = {
    if (m == 0) n + 1
    else if (m > 0 && n == 0) A(m - 1, 1)
    else if (m > 0 && n > 0) A(m - 1, A(m, n - 1))
    else -1
  }

  println(A(3, 4))

}
