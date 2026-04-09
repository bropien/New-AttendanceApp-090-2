import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TouchableOpacity, FlatList, Alert,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useMemo, useRef } from "react";

const history = [
  { id: "1", course: "Mobile Programming", date: "2026-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
  { id: "3", course: "Operating System", date: "2026-03-03", status: "Absent" },
  { id: "4", course: "Computer Network", date: "2026-03-04", status: "Present" },
  { id: "5", course: "Artificial Intelligence", date: "2026-03-05", status: "Present" },
  { id: "6", course: "Data Mining", date: "2026-03-06", status: "Present" },
  { id: "7", course: "Software Engineering", date: "2026-03-07", status: "Absent" },
  { id: "8", course: "Web Programming", date: "2026-03-08", status: "Present" },
  { id: "9", course: "Computer Graphics", date: "2026-03-09", status: "Present" },
  { id: "10", course: "Machine Learning", date: "2026-03-10", status: "Absent" },
  { id: "11", course: "Cyber Security", date: "2026-03-11", status: "Present" },
  { id: "12", course: "Cloud Computing", date: "2026-03-12", status: "Present" },
  { id: "13", course: "Information System", date: "2026-03-13", status: "Absent" },
  { id: "14", course: "Operating System", date: "2026-03-14", status: "Present" },
  { id: "15", course: "Database System", date: "2026-03-15", status: "Present" },
  { id: "16", course: "Mobile Programming", date: "2026-03-16", status: "Present" },
  { id: "17", course: "Computer Network", date: "2026-03-17", status: "Absent" },
  { id: "18", course: "Software Engineering", date: "2026-03-18", status: "Present" },
  { id: "19", course: "Artificial Intelligence", date: "2026-03-19", status: "Present" },
  { id: "20", course: "Machine Learning", date: "2026-03-20", status: "Present" },
  { id: "21", course: "Web Programming", date: "2026-03-21", status: "Absent" },
  { id: "22", course: "Data Mining", date: "2026-03-22", status: "Present" },
  { id: "23", course: "Cloud Computing", date: "2026-03-23", status: "Present" },
  { id: "24", course: "Cyber Security", date: "2026-03-24", status: "Absent" }
];

const Home = () => {

  const presentCount = history.filter(h => h.status === "Present").length;
  const absentCount = history.filter(h => h.status === "Absent").length;

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

        <Text style={styles.title}>Attendance App</Text>

        {/* Student Card */}
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>

          <View>
            <Text style={styles.name}>Muhammad Zakky Raihan</Text>
            <Text>NIM : 0320240090</Text>
            <Text>Class : MI-2A</Text>
          </View>
        </View>

        {/* Today's Class */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>
        </View>

        {/* Upcoming Class */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Upcoming Class</Text>
          <Text>Database System</Text>
          <Text>10:30 - 12:30</Text>
          <Text>Room 204</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CHECK</Text>
        </TouchableOpacity>

        {/* Attendance Summary */}
        <View style={styles.summary}>
          <Text style={styles.subtitle}>Attendance Summary</Text>
          <Text>Present : {presentCount}</Text>
          <Text>Absent : {absentCount}</Text>
        </View>

        <Text style={styles.subtitle}>Attendance History</Text>

        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4efef"
  },

  content: {
    padding: 20,
    paddingBottom: 40
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },

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

  classCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },

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

  button: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20
  },

  buttonText: {
    color: "white",
    fontWeight: "bold"
  },

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
  }

});