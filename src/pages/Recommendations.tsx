import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Container,
  Paper,
  useTheme,
  Alert,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';

interface Recommendation {
  id: string;
  category: string;
  recommendation: string;
  sources: string[];
  sourceTags: string[];
  needTags: string[];
}

type SortOption = 'category' | 'recommendation' | 'sources';

const Recommendations: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSourceTag, setSelectedSourceTag] = useState<string>('');
  const [selectedNeedTag, setSelectedNeedTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('category');

  const { data: recommendations, isLoading, error } = useQuery<Recommendation[]>({
    queryKey: ['recommendations'],
    queryFn: async () => {
      console.log('Fetching recommendations...');
      try {
        const querySnapshot = await getDocs(collection(db, 'recommendations'));
        console.log('Query snapshot:', querySnapshot);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Recommendation));
        console.log('Processed data:', data);
        return data;
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        throw err;
      }
    },
  });

  // Extract unique categories, source tags, and need tags
  const categories = useMemo(() => 
    Array.from(new Set(recommendations?.map(r => r.category) || [])),
    [recommendations]
  );

  const sourceTags = useMemo(() => 
    Array.from(new Set(recommendations?.flatMap(r => r.sourceTags) || [])),
    [recommendations]
  );

  const needTags = useMemo(() => 
    Array.from(new Set(recommendations?.flatMap(r => r.needTags) || [])),
    [recommendations]
  );

  // Filter and sort recommendations
  const filteredAndSortedRecommendations = useMemo(() => {
    if (!recommendations) return [];

    console.log('Current filters:', {
      searchQuery,
      selectedCategory,
      selectedSourceTag,
      selectedNeedTag,
      sortBy
    });

    let filtered = recommendations.filter(rec => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        (rec.recommendation?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (rec.category?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (rec.sources?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);

      // Category filter
      const matchesCategory = selectedCategory === '' || rec.category === selectedCategory;

      // Source tag filter
      const matchesSourceTag = selectedSourceTag === '' || 
        (rec.sourceTags?.some(tag => tag === selectedSourceTag) ?? false);

      // Need tag filter
      const matchesNeedTag = selectedNeedTag === '' || 
        (rec.needTags?.some(tag => tag === selectedNeedTag) ?? false);

      const matches = matchesSearch && matchesCategory && matchesSourceTag && matchesNeedTag;
      
      if (!matches) {
        console.log('Recommendation filtered out:', {
          id: rec.id,
          category: rec.category,
          sourceTags: rec.sourceTags,
          needTags: rec.needTags,
          matchesSearch,
          matchesCategory,
          matchesSourceTag,
          matchesNeedTag
        });
      }

      return matches;
    });

    console.log('Filtered results count:', filtered.length);

    // Sort recommendations
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        case 'recommendation':
          return (a.recommendation || '').localeCompare(b.recommendation || '');
        case 'sources':
          return ((a.sources?.[0] || '')).localeCompare((b.sources?.[0] || ''));
        default:
          return 0;
      }
    });

    return sorted;
  }, [recommendations, searchQuery, selectedCategory, selectedSourceTag, selectedNeedTag, sortBy]);

  // Add console logging for the initial data load
  React.useEffect(() => {
    if (recommendations) {
      console.log('Loaded recommendations:', {
        total: recommendations.length,
        categories: categories,
        sourceTags: sourceTags,
        needTags: needTags
      });
    }
  }, [recommendations, categories, sourceTags, needTags]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography variant="h6" color="text.secondary">Loading recommendations...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading recommendations: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      </Container>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          No recommendations found. Please check if the database is properly configured.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 2,
          background: theme.palette.background.default,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 3
          }}
        >
          Recommendations ({filteredAndSortedRecommendations.length})
        </Typography>

        {/* Search and Filter Controls */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search recommendations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                label="Category"
                onChange={(e: SelectChangeEvent) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="source-tag-label">Source Tag</InputLabel>
              <Select
                labelId="source-tag-label"
                value={selectedSourceTag}
                label="Source Tag"
                onChange={(e: SelectChangeEvent) => setSelectedSourceTag(e.target.value)}
              >
                <MenuItem value="">All Source Tags</MenuItem>
                {sourceTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="need-tag-label">Need Tag</InputLabel>
              <Select
                labelId="need-tag-label"
                value={selectedNeedTag}
                label="Need Tag"
                onChange={(e: SelectChangeEvent) => setSelectedNeedTag(e.target.value)}
              >
                <MenuItem value="">All Need Tags</MenuItem>
                {needTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                label="Sort By"
                onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as SortOption)}
              >
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="recommendation">Recommendation</MenuItem>
                <MenuItem value="sources">Sources</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        
        <Stack spacing={4}>
          {filteredAndSortedRecommendations.map((recommendation, index) => (
            <Card 
              key={`${recommendation.id}-${index}`}
              elevation={0}
              sx={{ 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  {recommendation.category}
                </Typography>
                
                <Typography 
                  paragraph
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    mb: 3
                  }}
                >
                  {recommendation.recommendation}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      mb: 1.5
                    }}
                  >
                    Sources
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {recommendation.sources.map((source, sourceIndex) => (
                      <Chip
                        key={`${recommendation.id}-source-${sourceIndex}`}
                        label={source}
                        size="small"
                        sx={{ 
                          m: 0.5,
                          backgroundColor: theme.palette.grey[100],
                          '&:hover': {
                            backgroundColor: theme.palette.grey[200],
                          }
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      mb: 1.5
                    }}
                  >
                    Source Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {recommendation.sourceTags.map((tag, tagIndex) => (
                      <Chip
                        key={`${recommendation.id}-source-tag-${tagIndex}`}
                        label={tag}
                        size="small"
                        color="primary"
                        sx={{ 
                          m: 0.5,
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.primary.contrastText,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                          }
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
                
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      mb: 1.5
                    }}
                  >
                    Need Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {recommendation.needTags.map((tag, tagIndex) => (
                      <Chip
                        key={`${recommendation.id}-need-tag-${tagIndex}`}
                        label={tag}
                        size="small"
                        color="secondary"
                        sx={{ 
                          m: 0.5,
                          backgroundColor: theme.palette.secondary.light,
                          color: theme.palette.secondary.contrastText,
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                          }
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Recommendations; 