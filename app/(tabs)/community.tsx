import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MessageSquare, 
  AlertTriangle, 
  Plus,
  Heart,
  MessageCircle,
  Share,
  Clock,
  MapPin,
  CheckCircle,
  X,
  Send
} from '@/components/LucideIcon';

interface HazardReport {
  id: string;
  location: string;
  issue: string;
  description: string;
  status: 'active' | 'in-progress' | 'resolved';
  reportedAt: string;
  reportedBy: string;
  upvotes: number;
  hasUpvoted: boolean;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  postedAt: string;
  likes: number;
  replies: number;
  hasLiked: boolean;
  category: 'general' | 'travel-tips' | 'accessibility' | 'equipment';
}

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'reports' | 'forum'>('reports');
  const [hazardReports, setHazardReports] = useState<HazardReport[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newReport, setNewReport] = useState({
    location: '',
    issue: '',
    description: ''
  });
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general' as const
  });

  useEffect(() => {
    loadHazardReports();
    loadForumPosts();
  }, []);

  const loadHazardReports = () => {
    // Mock data - in real app, this would fetch from Supabase
    const mockReports: HazardReport[] = [
      {
        id: '1',
        location: 'Main Street Station',
        issue: 'Elevator out of service',
        description: 'The main elevator has been broken for 2 days. Using the service elevator requires asking staff.',
        status: 'active',
        reportedAt: '2 hours ago',
        reportedBy: 'Sarah M.',
        upvotes: 8,
        hasUpvoted: false
      },
      {
        id: '2',
        location: 'Central Park West Entrance',
        issue: 'Construction blocking path',
        description: 'Temporary construction has blocked the accessible path. Alternative route via east entrance is available.',
        status: 'in-progress',
        reportedAt: '1 day ago',
        reportedBy: 'Mike R.',
        upvotes: 12,
        hasUpvoted: true
      },
      {
        id: '3',
        location: 'City Library',
        issue: 'Automatic door repaired',
        description: 'The front entrance automatic door is now working properly again.',
        status: 'resolved',
        reportedAt: '3 days ago',
        reportedBy: 'Lisa K.',
        upvotes: 5,
        hasUpvoted: false
      }
    ];
    setHazardReports(mockReports);
  };

  const loadForumPosts = () => {
    // Mock data - in real app, this would fetch from Supabase
    const mockPosts: ForumPost[] = [
      {
        id: '1',
        title: 'Best accessible hotels in London?',
        content: 'Planning a trip next month and looking for recommendations for wheelchair-friendly hotels with good accessibility features.',
        author: 'TravelLover23',
        postedAt: '3 hours ago',
        likes: 7,
        replies: 12,
        hasLiked: false,
        category: 'travel-tips'
      },
      {
        id: '2',
        title: 'Lightweight wheelchair recommendations',
        content: 'My current chair is getting heavy for daily use. Looking for lightweight options that are still durable.',
        author: 'ActiveLife',
        postedAt: '5 hours ago',
        likes: 15,
        replies: 8,
        hasLiked: true,
        category: 'equipment'
      },
      {
        id: '3',
        title: 'New accessible restaurant opened downtown',
        content: 'Just visited "The Inclusive Table" - amazing food and excellent accessibility. Wide doorways, accessible bathrooms, and staff trained in accessibility awareness.',
        author: 'FoodieWheels',
        postedAt: '1 day ago',
        likes: 23,
        replies: 6,
        hasLiked: false,
        category: 'general'
      }
    ];
    setForumPosts(mockPosts);
  };

  const submitHazardReport = () => {
    if (!newReport.location || !newReport.issue) {
      Alert.alert('Missing information', 'Please fill in at least the location and issue.');
      return;
    }

    // In real app, this would save to Supabase
    const report: HazardReport = {
      id: Date.now().toString(),
      location: newReport.location,
      issue: newReport.issue,
      description: newReport.description,
      status: 'active',
      reportedAt: 'Just now',
      reportedBy: 'You',
      upvotes: 0,
      hasUpvoted: false
    };

    setHazardReports([report, ...hazardReports]);
    setNewReport({ location: '', issue: '', description: '' });
    setShowReportModal(false);
    Alert.alert('Report submitted', 'Thank you for helping the community stay informed!');
  };

  const submitForumPost = () => {
    if (!newPost.title || !newPost.content) {
      Alert.alert('Missing information', 'Please provide both a title and content for your post.');
      return;
    }

    // In real app, this would save to Supabase
    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'You',
      postedAt: 'Just now',
      likes: 0,
      replies: 0,
      hasLiked: false,
      category: newPost.category
    };

    setForumPosts([post, ...forumPosts]);
    setNewPost({ title: '', content: '', category: 'general' });
    setShowPostModal(false);
    Alert.alert('Post published', 'Your post has been shared with the community!');
  };

  const toggleUpvote = (reportId: string) => {
    setHazardReports(reports =>
      reports.map(report =>
        report.id === reportId
          ? {
              ...report,
              upvotes: report.hasUpvoted ? report.upvotes - 1 : report.upvotes + 1,
              hasUpvoted: !report.hasUpvoted
            }
          : report
      )
    );
  };

  const toggleLike = (postId: string) => {
    setForumPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
              hasLiked: !post.hasLiked
            }
          : post
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#EF4444';
      case 'in-progress': return '#F59E0B';
      case 'resolved': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'travel-tips': return '#3B82F6';
      case 'accessibility': return '#10B981';
      case 'equipment': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>Share experiences and stay informed together</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'reports' && styles.tabActive]}
          onPress={() => setActiveTab('reports')}
        >
          <AlertTriangle size={20} color={activeTab === 'reports' ? '#4F46E5' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'reports' && styles.tabTextActive]}>
            Hazard Reports
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'forum' && styles.tabActive]}
          onPress={() => setActiveTab('forum')}
        >
          <MessageSquare size={20} color={activeTab === 'forum' ? '#4F46E5' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'forum' && styles.tabTextActive]}>
            Forum
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'reports' ? (
          <View style={styles.reportsSection}>
            {hazardReports.map((report) => (
              <View key={report.id} style={styles.reportCard}>
                <View style={styles.reportHeader}>
                  <View style={styles.reportInfo}>
                    <View style={styles.locationRow}>
                      <MapPin size={16} color="#6B7280" />
                      <Text style={styles.reportLocation}>{report.location}</Text>
                    </View>
                    <Text style={styles.reportIssue}>{report.issue}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(report.status) }
                  ]}>
                    <Text style={styles.statusText}>
                      {report.status.replace('-', ' ')}
                    </Text>
                  </View>
                </View>

                <Text style={styles.reportDescription}>{report.description}</Text>

                <View style={styles.reportFooter}>
                  <View style={styles.reportMeta}>
                    <Clock size={14} color="#9CA3AF" />
                    <Text style={styles.metaText}>{report.reportedAt}</Text>
                    <Text style={styles.metaText}>by {report.reportedBy}</Text>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.upvoteButton}
                    onPress={() => toggleUpvote(report.id)}
                  >
                    <Heart size={16} color={report.hasUpvoted ? '#EF4444' : '#9CA3AF'} />
                    <Text style={[
                      styles.upvoteText,
                      report.hasUpvoted && { color: '#EF4444' }
                    ]}>
                      {report.upvotes}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.forumSection}>
            {forumPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postInfo}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <View style={styles.postMeta}>
                      <Text style={styles.authorText}>{post.author}</Text>
                      <Text style={styles.separator}>•</Text>
                      <Text style={styles.timeText}>{post.postedAt}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.categoryBadge,
                    { backgroundColor: getCategoryColor(post.category) }
                  ]}>
                    <Text style={styles.categoryText}>{post.category}</Text>
                  </View>
                </View>

                <Text style={styles.postContent}>{post.content}</Text>

                <View style={styles.postActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => toggleLike(post.id)}
                  >
                    <Heart size={16} color={post.hasLiked ? '#EF4444' : '#9CA3AF'} />
                    <Text style={[
                      styles.actionText,
                      post.hasLiked && { color: '#EF4444' }
                    ]}>
                      {post.likes}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <MessageCircle size={16} color="#9CA3AF" />
                    <Text style={styles.actionText}>{post.replies}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Share size={16} color="#9CA3AF" />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => activeTab === 'reports' ? setShowReportModal(true) : setShowPostModal(true)}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Report Modal */}
      <Modal
        visible={showReportModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowReportModal(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Report Hazard</Text>
            <TouchableOpacity onPress={submitHazardReport}>
              <Send size={24} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Main Street Station, Central Park entrance"
                value={newReport.location}
                onChangeText={(text) => setNewReport({ ...newReport, location: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Issue *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Elevator out of service, blocked ramp"
                value={newReport.issue}
                onChangeText={(text) => setNewReport({ ...newReport, issue: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                placeholder="Provide additional details that might help others..."
                value={newReport.description}
                onChangeText={(text) => setNewReport({ ...newReport, description: text })}
                multiline
                numberOfLines={4}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Post Modal */}
      <Modal
        visible={showPostModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowPostModal(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Post</Text>
            <TouchableOpacity onPress={submitForumPost}>
              <Send size={24} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categorySelector}>
                {[
                  { key: 'general', label: 'General' },
                  { key: 'travel-tips', label: 'Travel Tips' },
                  { key: 'accessibility', label: 'Accessibility' },
                  { key: 'equipment', label: 'Equipment' }
                ].map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.categoryOption,
                      newPost.category === category.key && styles.categoryOptionSelected
                    ]}
                    onPress={() => setNewPost({ ...newPost, category: category.key as any })}
                  >
                    <Text style={[
                      styles.categoryOptionText,
                      newPost.category === category.key && styles.categoryOptionTextSelected
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="What's your question or topic?"
                value={newPost.title}
                onChangeText={(text) => setNewPost({ ...newPost, title: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Content *</Text>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                placeholder="Share your experience, ask for advice, or start a discussion..."
                value={newPost.content}
                onChangeText={(text) => setNewPost({ ...newPost, content: text })}
                multiline
                numberOfLines={6}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 8,
  },
  tabTextActive: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  reportsSection: {
    padding: 20,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reportInfo: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reportLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 6,
  },
  reportIssue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  reportDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  upvoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
  },
  upvoteText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    marginLeft: 4,
  },
  forumSection: {
    padding: 20,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  postInfo: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  separator: {
    fontSize: 12,
    color: '#9CA3AF',
    marginHorizontal: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  postContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
  },
  actionText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  categoryOptionSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  categoryOptionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryOptionTextSelected: {
    color: '#FFFFFF',
  },
});