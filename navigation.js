import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SecondScreen from './screens/SecondScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SecondScreen" component={SecondScreen} />
        </Stack.Navigator>
    );
}

export default Navigation;















// import React from 'react'; // React import ediliyor
// import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack navigator import ediliyor
// import HomeScreen from './screens/HomeScreen'; // HomeScreen import ediliyor
// import SecondScreen from './screens/SecondScreen'; // SecondScreen import ediliyor

// const Stack = createNativeStackNavigator(); // Stack navigator oluşturuluyor

// function Navigation({ tasks, task, setTask, addTask, deleteTask, completedTasks }) {
//   return (
//     <Stack.Navigator>
//       {/* HomeScreen ekranı */}
//       <Stack.Screen name="Home">
//         {(props) => (
//           <HomeScreen
//             {...props}
//             tasks={tasks} // Görev listesi HomeScreen'e gönderiliyor
//             task={task} // Tekli görev HomeScreen'e gönderiliyor
//             setTask={setTask} // Görev ayarlama fonksiyonu HomeScreen'e gönderiliyor
//             addTask={addTask} // Görev ekleme fonksiyonu HomeScreen'e gönderiliyor
//             deleteTask={deleteTask} // Görev silme fonksiyonu HomeScreen'e gönderiliyor
//           />
//         )}
//       </Stack.Screen>

//       {/* SecondScreen ekranı */}
//       <Stack.Screen name="SecondScreen">
//         {(props) => (
//           <SecondScreen
//             {...props}
//             completedTasks={completedTasks} // Silinen görevler SecondScreen'e gönderiliyor
//           />
//         )}
//       </Stack.Screen>
//     </Stack.Navigator>
//   );
// }

// export default Navigation; // Navigation bileşeni dışa aktarılıyor
