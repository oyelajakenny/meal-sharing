export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-black text-white py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 m-auto from-white-900">
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Developer
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Career
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Top Meals
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reserve A Meal
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sign Up
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  All Meals
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Meals Cloud</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Sushi Platter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Herring Smorrebrod
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Lasagna
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Peking Duck
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Plantain and Beans
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Fried Rice
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Locations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Copenhagen
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Norreport
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Skovbrynet
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Berlin
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  San Franscisco
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Naples
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            2014 Meashly | Website Developed by { " " }
            <span className="font-bold">Oyelaja Hussein</span>
          </p>
                  </div>
      </div>
    </footer>
  );
}
