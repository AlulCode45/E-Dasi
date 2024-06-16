import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="w-screen flex">
        <div className="bg-blue-400 hidden lg:grid place-content-center w-3/5 h-screen">
          <Image src={'/assets/logo-smkn-4-bojonegoro.png'} width={500} height={500} alt="" className="w-[200px] h-[300px]" />
        </div>
        <div className="w-screen lg:w-2/5 p-10 h-screen flex items-center border-l-4 border-blue-600 lg:border-0">
          <form action="">
            <h1 className="text-4xl mb-2">Selamat datang di <b>E-DaSi</b></h1>
            <p>Masukan <span className="font-semibold">Username</span> dan <span className="font-semibold">Password</span> untuk melanjutkan ke dashboard Aplikasi !</p>
            <hr className="my-5" />
            <div className="my-2">
              <label htmlFor="" className="block mb-2 text-sm">Username</label>
              <input type="text" className="w-full p-2 rounded-md border focus:outline-blue-400" placeholder="Masukan Username" />
            </div>
            <div className="my-2">
              <label htmlFor="" className="block mb-2 text-sm">Password</label>
              <input type="password" className="w-full p-2 rounded-md border focus:outline-blue-400" placeholder="Masukan Password" />
            </div>
            <button className="bg-blue-400 w-1/3 py-2 rounded-md text-white mt-4">Masuk</button>
          </form>
        </div>
      </div>
    </>
  )
}
