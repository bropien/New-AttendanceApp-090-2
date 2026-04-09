import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

// DATA AWAL
const initialHistory = [
  { id: "1", course: "Mobile Programming", date: "2026-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
  { id: "3", course: "Operating System", date: "2026-03-03", status: "Absent" }
];

export default function App() {
  const [history, setHistory] = useState(initialHistory);
  const [currentTime, setCurrentTime] = useState("");
  const [sudahAbsen, setSudahAbsen] = useState(false);
  const [note, setNote] = useState("");
  const noteInputRef = useRef(null);

  // MEMO STATS
  const AttendanceStats = useMemo(() => {
    console.log("Menghitung ulang statistik kehadiran");

    const presentCount = history.filter(item => item.status === "Present").length;
    const absentCount = history.filter(item => item.status === "Absent").length;

    return {
      totalPresent: presentCount,
      totalAbsent: absentCount
    };
  }, [history]);

  // JAM REALTIME
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString("id-ID");
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // CHECK IN
  const handleCheckIn = () => {
    if (sudahAbsen) {
      Alert.alert("Perhatian", "Anda sudah melakukan check in.");
      return;
    }

    if (note.trim() === "") {
      Alert.alert("Peringatan", "Catatan kehadiran wajib diisi.");
      noteInputRef.current.focus();
      return;
    }

    const newAttendance = {
      id: Date.now().toString(),
      course: "Mobile Programming",
      date: new Date().toLocaleDateString("id-ID"),
      status: "Present"
    };

    setHistory([newAttendance, ...history]);
    setSudahAbsen(true);

    Alert.alert("Sukses", `Berhasil absen pada ${currentTime}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.statusContainer}>
        {item.status === "Present" ? (
          <MaterialIcons name="check-circle" size={20} color="green" />
        ) : (
          <MaterialIcons name="cancel" size={20} color="red" />
        )}
        <Text style={item.status === "Present" ? styles.present : styles.absent}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        {/* STUDENT */}
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>

          <View style={styles.classCard}>
            <Text style={styles.name}>Muhammad Zakky Raihan</Text>
            <Text>NIM : 0320240090</Text>
            <Text>Class : MI-2A</Text>

            {!sudahAbsen && (
              <TextInput
                ref={noteInputRef}
                style={styles.inputCatatan}
                placeholder="Masukkan catatan (cth: Hadir lab)"
                value={note}
                onChangeText={setNote}
              />
            )}

            <TouchableOpacity
              style={[
                styles.button,
                sudahAbsen ? styles.buttonDisabled : styles.buttonActive
              ]}
              onPress={handleCheckIn}
              disabled={sudahAbsen}
            >
              <Text style={styles.buttonText}>
                {sudahAbsen ? "SUDAH ABSEN" : "CHECK IN"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SUMMARY */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{AttendanceStats.totalPresent}</Text>
            <Text style={styles.statLabel}>Total Present</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "red" }]}>
              {AttendanceStats.totalAbsent}
            </Text>
            <Text style={styles.statLabel}>Total Absent</Text>
          </View>
        </View>

        {/* HISTORY */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Attendance History</Text>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4efef"
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },

  // HEADER
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  title: {
    fontSize: 24,
    fontWeight: "bold"
  },

  clockText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    fontVariant: ["tabular-nums"]
  },

  // CARD
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },

  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15
  },

  name: {
    fontSize: 18,
    fontWeight: "bold"
  },

  // BUTTON
  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20
  },

  buttonActive: {
    backgroundColor: "#007AFF"
  },

  buttonDisabled: {
    backgroundColor: "#A0C4FF"
  },

  buttonText: {
    color: "white",
    fontWeight: "bold"
  },

  // SUMMARY
  summary: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  // LIST
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },

  course: {
    fontSize: 16
  },

  date: {
    fontSize: 12,
    color: "gray"
  },

  present: {
    color: "green",
    fontWeight: "bold",
    marginLeft: 5
  },

  absent: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 5
  },

  inputCatatan:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:8,
    padding:10,
    marginTop:15,
    backgroundColor:'#fafafa'
  },

  statsCard:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'white',
    padding:15,
    borderRadius:10,
    marginBottom:20
  },
  statBox:{
    alignItems:'center'
  },

  statNumber:{
    fontSize:20,
    fontWeight:'bold',
    color:'green',
  },

  ststLabel:{
    fontSize:14,
    color:'gray'
  },
  classCard: {
  flex: 1,
  backgroundColor: "#fff",
  padding: 15,
  borderRadius: 10,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 5,
  elevation: 2
},

statLabel: {
  fontSize: 14,
  color: "gray"
},
});

