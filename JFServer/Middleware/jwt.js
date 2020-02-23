// class HandlerGenerator {
  
//           let token = jwt.sign({username: username},
//             config.secret,
//             { expiresIn: '24h' // expires in 24 hours
//             }
//           );
//           // return the JWT token for the future API calls
//           res.json({
//             success: true,
//             message: 'Authentication successful!',
//             token: token
//           });
//         } else {
//           res.send(403).json({
//             success: false,
//             message: 'Incorrect username or password'
//           });
//         }
//       } else {
//         res.send(400).json({
//           success: false,
//           message: 'Authentication failed! Please check the request'
//         });
//       }
//     }
// }