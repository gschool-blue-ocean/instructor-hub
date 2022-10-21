
import {verify} from 'jsonwebtoken';
export const authenticated = (handler) => {
    return async (req, res) => {
      return new Promise ((resolve, reject) => {
        //do token/cookie checks here
        console.log("touched the middleware")
        verify(req.cookies.authCookie, process.env.COOKIE_SECRET_KEY, function(err, decoded) {
          if(err && decoded) {
        return handler(req, res);
        }
        res.redirect('/');
      })
        
        resolve();
      });
    }
     
  };

  export const authenticate = (handler) => {
    return async (req, res) => {
    return handler(req, res);
  }


}

//   export const config = {
//     matcher: [
//       /*
//        * Match all request paths except for the ones starting with:
//        * - api (API routes)
//        * - static (static files)
//        * - favicon.ico (favicon file)
//        */
//       '/((?!signup|technologies|favicon.ico).*)',
//       '/(!$)'
//     ],
//   };


