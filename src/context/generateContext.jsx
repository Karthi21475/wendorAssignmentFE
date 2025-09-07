function generateDays(numDays = 7) {
  const today = new Date();
  const options = { weekday: "short" };

  return Array.from({ length: numDays }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);

    return {
      label: date.toLocaleDateString("en-US", options).toUpperCase(),
      date: date.getDate(),
      fullDate: date.toISOString().split("T")[0],
    };
  });
}

function generateSlots(startHour = 9, endHour = 18, interval = 60) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += interval) {
      const h = hour % 12 === 0 ? 12 : hour % 12;
      const ampm = hour < 12 ? "AM" : "PM";
      slots.push(`${h}:${min.toString().padStart(2, "0")} ${ampm}`);
    }
  }
  return slots;
}