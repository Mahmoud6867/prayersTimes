import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-ly";
import { Avatar } from "@mui/material";

moment.locale("ar-ly");
function MainContent() {
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  const [selectedCity, setSelectedCity] = useState({
    displayName: "مكة المكرمة",
    apiName: "Makkah al Mukarramah",
    countryApiName: "SA",
    countryDisplayName: "السعودية",
    flag: "../public/saudi.png",
  });

  const [remainingTime, setRemainingTime] = useState("00 : 00 : 00");

  const [today, setToday] = useState("الوفت و التاريخ");

  const availableCities = [
    {
      displayName: "مكة المكرمة",
      apiName: "Makkah al Mukarramah",
      countryApiName: "SA",
      countryDisplayName: "السعودية",
      flag: "../public/saudi.png",
    },
    {
      displayName: "المدينة المنورة",
      apiName: "Medina",
      countryApiName: "SA",
      countryDisplayName: "السعودية",
      flag: "../public/saudi.png",
    },
    {
      displayName: "الرياض",
      apiName: "Riyadh",
      countryApiName: "SA",
      countryDisplayName: "السعودية",
      flag: "../public/saudi.png",
    },
    {
      displayName: "القاهرة",
      apiName: "Cairo",
      countryApiName: "EG",
      countryDisplayName: "مصر",
      flag: "../public/egypt.png",
    },
    {
      displayName: "الإسكندرية",
      apiName: "Alexandria",
      countryApiName: "EG",
      countryDisplayName: "مصر",
      flag: "../public/egypt.png",
    },
    {
      displayName: "الفيوم",
      apiName: "Faiyum",
      countryApiName: "EG",
      countryDisplayName: "مصر",
      flag: "../public/egypt.png",
    },
    {
      displayName: "الخرطوم",
      apiName: "Khartoum",
      countryApiName: "SD",
      countryDisplayName: "السودان",
      flag: "../public/sudan.png",
    },
    {
      displayName: "نواكشوط",
      apiName: "Nouakchott",
      countryApiName: "MR",
      countryDisplayName: "موريتانيا",
      flag: "../public/mauritania.png",
    },
    {
      displayName: "الرباط",
      apiName: "Rabat",
      countryApiName: "MA",
      countryDisplayName: "المغرب",
      flag: "../public/morocco.png",
    },
    {
      displayName: "الجزائر",
      apiName: "Algiers",
      countryApiName: "DZ",
      countryDisplayName: "الجزائر",
      flag: "../public/algeria.png",
    },
    {
      displayName: "تونس",
      apiName: "Tunis",
      countryApiName: "TN",
      countryDisplayName: "تونس",
      flag: "../public/tunisia.png",
    },
    {
      displayName: "طرايلس",
      apiName: "Tripoli",
      countryApiName: "LY",
      countryDisplayName: "ليبيا",
      flag: "../public/libya.png",
    },
    {
      displayName: "القدس",
      apiName: "Jerusalem ",
      countryApiName: "PS",
      countryDisplayName: "فلسطين",
      flag: "../public/palestine.png",
    },
    {
      displayName: "غزة",
      apiName: "Gaza ",
      countryApiName: "PS",
      countryDisplayName: "فلسطين",
      flag: "../public/palestine.png",
    },
    {
      displayName: "عمان",
      apiName: "Amman",
      countryApiName: "JO",
      countryDisplayName: "الأردن",
      flag: "../public/jordan.png",
    },
    {
      displayName: "دمشق",
      apiName: "Damascus",
      countryApiName: "SY",
      countryDisplayName: "سوريا",
      flag: "../public/syria.png",
    },
    {
      displayName: "بيروت",
      apiName: "Beirut",
      countryApiName: "LB",
      countryDisplayName: "لبنان",
      flag: "../public/lebanon.png",
    },
    {
      displayName: "مقديشو",
      apiName: "Mogadishu ",
      countryApiName: "SO",
      countryDisplayName: "الصومال",
      flag: "../public/somalia.png",
    },
    {
      displayName: "صنعاء",
      apiName: "Sanaa",
      countryApiName: "YE",
      countryDisplayName: "اليمن",
      flag: "../public/yemen.png",
    },
    {
      displayName: "مسقط",
      apiName: "Muscat",
      countryApiName: "OM",
      countryDisplayName: "عمان",
      flag: "../public/oman.png",
    },
    {
      displayName: "أبوظبي",
      apiName: "Abu Dhabi",
      countryApiName: "AE",
      countryDisplayName: "الإمارات",
      flag: "../public/united-arab-emirates.png",
    },
    {
      displayName: "المنامة",
      apiName: "Manama",
      countryApiName: "BH",
      countryDisplayName: "البحرين",
      flag: "../public/bahrain.png",
    },
    {
      displayName: "الدوحة",
      apiName: "Doha",
      countryApiName: "QA",
      countryDisplayName: "قطر",
      flag: "../public/qatar.png",
    },
    {
      displayName: "الكويت",
      apiName: "Kuwait",
      countryApiName: "KW",
      countryDisplayName: "الكويت",
      flag: "../public/kuwait.png",
    },
    {
      displayName: "بغداد",
      apiName: "Baghdad",
      countryApiName: "IQ",
      countryDisplayName: "العراق",
      flag: "../public/iraq.png",
    },
  ];

  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  // API call function
  const getTimings = async () => {
    console.log("calling the API");
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=${selectedCity.countryApiName}&city=${selectedCity.apiName}`
    );
    console.log("the data is ", response.data.data);
    setTimings(response.data.data.timings);
  };

  // Countdown timer function
  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = null;
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayerIndex(prayerIndex);

    const nextPrayerObject = prayersArray[prayerIndex];

    const nextPrayerTime = timings[nextPrayerObject.key];

    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDifference = midnightDiff + fajrToMidnightDiff;
      remainingTime = totalDifference;
    }

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );
  };

  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      const t = moment();
      setToday(t.format("Do MMMM YYYY | hh:mm:ss a"));
      setupCountdownTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  // City change function
  const handleCityChange = (event) => {
    const cityObject = availableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setSelectedCity(cityObject);
    console.log("The new value is ", event.target.value);
  };

  return (
    <div>
      {/* first row */}
      <Grid container>
        {/* first column */}
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>
              {selectedCity.displayName} / {selectedCity.countryDisplayName}{" "}
              <Avatar
                alt={`${selectedCity.countryDisplayName}`}
                src={`${selectedCity.flag}`}
                sx={{ width: 56, height: 56 }}
              />
            </h1>
          </div>
        </Grid>

        {/* second column */}
        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider
        style={{ borderColor: "white", opacity: "0.1" }}
        variant="middle"
      />

      {/* cards */}
      <Stack direction="row" justifyContent={"space-evenly"} marginTop={5}>
        <Prayer name={"الفجر"} time={timings.Fajr} image={"/fajer.jpeg"} />
        <Prayer name={"الظهر"} time={timings.Dhuhr} image={"/dhoher.jpeg"} />
        <Prayer name={"العصر"} time={timings.Asr} image={"/asr.jpeg"} />
        <Prayer
          name={"المغرب"}
          time={timings.Maghrib}
          image={"/maghreb.jpeg"}
        />
        <Prayer name={"العشاء"} time={timings.Isha} image={"/isha.jpeg"} />
      </Stack>

      {/* select */}
      <Stack direction="row" justifyContent="center" marginTop={5}>
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
            المدينة
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={availableCities}
            label="Age"
            onChange={handleCityChange}
          >
            {availableCities.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName} / {city.countryDisplayName}{" "}
                  <Avatar
                    alt={`${city.countryDisplayName}`}
                    src={`${city.flag}`}
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}

export default MainContent;
