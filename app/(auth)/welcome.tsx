import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, Text, View, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width } = Dimensions.get("window");

export default function OnBoarding() {
  const swiperRef = useRef<SwiperFlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Pressable
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </Pressable>
      <SwiperFlatList
        ref={swiperRef}
        showPagination
        data={onboarding}
        paginationStyle={{ position: "relative" }}
        paginationStyleItem={{
          width: 32,
          height: 4,
          marginHorizontal: 1,
          backgroundColor: "#E2E8F0",
          borderRadius: 100,
        }}
        paginationStyleItemActive={{
          width: 32,
          height: 4,
          marginHorizontal: 1,
          backgroundColor: "#0286FF",
          borderRadius: 100,
        }}
        onChangeIndex={({ index }) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View
            key={item.id}
            className="flex items-center justify-center"
            style={{ width: width }}
          >
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        )}
      />
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollToIndex({ index: activeIndex + 1 })
        }
        className="w-10/12 my-10"
      />
    </SafeAreaView>
  );
}
