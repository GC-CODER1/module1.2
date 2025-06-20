import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ImageBackground,
} from 'react-native';
import {
  Text,
} from 'react-native-paper';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { Heart, Users, MapPin } from 'lucide-react-native';
import { SignOutButton } from '@/components/SignOutButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { useAppAuth } from '@/contexts/AuthContext';
import { colors, spacing, borderRadius } from '@/lib/design-tokens';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomePage() {
  const { user } = useUser();
  const { profile, loading } = useAppAuth();
  const citizenCardScale = useSharedValue(1);
  const facilitatorCardScale = useSharedValue(1);

  const citizenCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: citizenCardScale.value }],
  }));

  const facilitatorCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: facilitatorCardScale.value }],
  }));

  const handleCitizenPress = () => {
    citizenCardScale.value = withSpring(0.95, {}, () => {
      citizenCardScale.value = withSpring(1);
    });
    router.push('/(citizen)');
  };

  const handleFacilitatorPress = () => {
    facilitatorCardScale.value = withSpring(0.95, {}, () => {
      facilitatorCardScale.value = withSpring(1);
    });
    router.push('/(facilitator)');
  };

  const getUserRole = () => {
    return profile?.role || user?.unsafeMetadata?.role as string || 'citizen';
  };

  const getUserName = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    if (user?.firstName) {
      return user.firstName;
    }
    if (profile?.email) {
      return profile.email.split('@')[0];
    }
    if (user?.emailAddresses?.[0]?.emailAddress) {
      return user.emailAddresses[0].emailAddress.split('@')[0];
    }
    if (user?.phoneNumbers?.[0]?.phoneNumber) {
      return user.phoneNumbers[0].phoneNumber;
    }
    return 'Friend';
  };

  if (loading) {
    return (
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
        style={styles.backgroundImage}
        blurRadius={6}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <View style={styles.iconContainer}>
              <Heart size={48} color={colors.primary[600]} />
            </View>
            <Text variant="headlineSmall" style={styles.loadingText}>
              Loading your profile...
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
      style={styles.backgroundImage}
      blurRadius={6}
    >
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.welcomeSection}>
                <View style={styles.iconContainer}>
                  <Heart size={48} color={colors.primary[600]} />
                </View>
                <Text variant="displayMedium" style={styles.title}>
                  Welcome Back!
                </Text>
                <Text variant="headlineSmall" style={styles.subtitle}>
                  Hello {getUserName()}
                </Text>
                <Text variant="bodyLarge" style={styles.roleText}>
                  Registered as: {getUserRole() === 'citizen' ? 'Citizen' : 'Facilitator'}
                </Text>
                <Text variant="bodyMedium" style={styles.description}>
                  Choose how you'd like to make a difference today
                </Text>
              </View>
              
              <View style={styles.signOutContainer}>
                <SignOutButton />
              </View>
            </View>

            <View style={styles.roleCards}>
              <AnimatedPressable onPress={handleCitizenPress} style={citizenCardAnimatedStyle}>
                <GlassCard variant="elevated" style={styles.citizenCard}>
                  <View style={styles.cardIcon}>
                    <MapPin size={40} color="#FFFFFF" />
                  </View>
                  <Text variant="headlineSmall" style={styles.cardTitle}>
                    Citizen Mode
                  </Text>
                  <Text variant="bodyMedium" style={styles.cardDescription}>
                    Report people in need and donate surplus resources to help your community
                  </Text>
                  <View style={styles.features}>
                    <Text style={styles.feature}>• Report people in need</Text>
                    <Text style={styles.feature}>• Donate food & resources</Text>
                    <Text style={styles.feature}>• Track your impact</Text>
                  </View>
                </GlassCard>
              </AnimatedPressable>

              <AnimatedPressable onPress={handleFacilitatorPress} style={facilitatorCardAnimatedStyle}>
                <GlassCard variant="elevated" style={styles.facilitatorCard}>
                  <View style={styles.cardIcon}>
                    <Users size={40} color="#FFFFFF" />
                  </View>
                  <Text variant="headlineSmall" style={styles.cardTitle}>
                    Facilitator Mode
                  </Text>
                  <Text variant="bodyMedium" style={styles.cardDescription}>
                    Accept delivery missions and coordinate aid efforts to help those in need
                  </Text>
                  <View style={styles.features}>
                    <Text style={styles.feature}>• Accept delivery missions</Text>
                    <Text style={styles.feature}>• Coordinate aid efforts</Text>
                    <Text style={styles.feature}>• Make direct impact</Text>
                  </View>
                </GlassCard>
              </AnimatedPressable>
            </View>

            <View style={styles.footer}>
              <Text variant="bodySmall" style={styles.footerText}>
                You can use both modes regardless of your registration role
              </Text>
            </View>
          </View>
        </SignedIn>

        <SignedOut>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Heart size={48} color={colors.primary[600]} />
              </View>
              <Text variant="displayMedium" style={styles.title}>
                Welcome to Impact
              </Text>
              <Text variant="headlineSmall" style={styles.subtitle}>
                Join our community to make a difference
              </Text>
            </View>

            <View style={styles.authButtons}>
              <Link href="/(auth)/sign-in" asChild>
                <GlassButton
                  title="Sign In"
                  onPress={() => {}}
                  variant="secondary"
                  size="lg"
                />
              </Link>
              
              <Link href="/(auth)/sign-up" asChild>
                <GlassButton
                  title="Sign Up"
                  onPress={() => {}}
                  variant="primary"
                  size="lg"
                />
              </Link>
            </View>

            <View style={styles.footer}>
              <Text variant="bodySmall" style={styles.footerText}>
                Sign up to start helping your community
              </Text>
            </View>
          </View>
        </SignedOut>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing['3xl'],
  },
  loadingText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing['3xl'],
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['6xl'],
  },
  welcomeSection: {
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: colors.glass.light,
    borderRadius: borderRadius['3xl'],
    padding: spacing['2xl'],
    marginBottom: spacing['3xl'],
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  title: {
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: spacing.md,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: colors.primary[300],
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  roleText: {
    color: colors.success[400],
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  signOutContainer: {
    marginTop: spacing['3xl'],
  },
  roleCards: {
    gap: spacing['3xl'],
    marginBottom: spacing['4xl'],
  },
  citizenCard: {
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    borderColor: 'rgba(79, 70, 229, 0.3)',
    borderWidth: 1,
  },
  facilitatorCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderWidth: 1,
  },
  cardIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius['3xl'],
    padding: spacing['2xl'],
    marginBottom: spacing['2xl'],
    alignSelf: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing['2xl'],
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  features: {
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  feature: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  authButtons: {
    gap: spacing.lg,
    marginBottom: spacing['4xl'],
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});